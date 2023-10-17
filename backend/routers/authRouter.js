require('dotenv').config();
const {
    ENVIRONMENT,
    ORIGIN_FRONTEND,
    SESSION_SECRET,
    ADMIN_SECRET,
    EDUID_SERVER_USER_URL,
    EDUID_SERVER_LOGOUT_URL,
} = process.env;

const express = require('express');
const authRouter = express.Router();
const database = require('../database.js');
const cookie_signature = require('cookie-signature');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session0Middleware = require('../middleware/session0.js')
const session1Middleware = require('../middleware/session1.js');
const roles = require('../../frontend/src/constants/roles.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const axios = require("axios");
const { eduid_authorization_uri } = require('../eduid_client.js');

authRouter.post(['/login', 'admin-login', '/admin-register'], session0Middleware);
authRouter.get(['/'], session1Middleware);
authRouter.delete(['/logout'], session1Middleware);

authRouter.get('/', (req, res) => {
    //select users where user_id from req.userInfo.user_id
    //gets current user data
    database.db.query(
        `SELECT u.*, r.role_name
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.role_id = ? 
        AND u.user_id = ?
        LIMIT 1`,
        [req.userInfo.role_id, req.userInfo.user_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error)
            }
            else if (result.length > 0) {
                res.status(200).json({ status: 'OK', message: 'Get current user success', result: req.userInfo });
            }
            else {
                res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
            }
        });
});

authRouter.get("/eduid/authorize", (req, res) => {
    res.redirect(eduid_authorization_uri)
});

authRouter.post('/login', async (req, res) => {
    //{edu_id_token}
    //get the user from eduid server using token as authorization
    //find user where edu_id matches
    //if user doesnt exist register the user
    //else set req.session.userInfo, cookie header, send userInfo
    const { eduid_token } = req.body;

    if (!(eduid_token?.length > 0)) {
        res.status(400).json({ status: 'Bad Request', message: 'Invalid or missing token' });
    }
    else {
        const eduid_result = await axios.get(`${EDUID_SERVER_USER_URL}`, {
            headers: {
                'Authorization': `Bearer ${eduid_token}`
            }
        })

        const eduid_user = eduid_result.data.data

        database.db.query(
            `SELECT u.*, r.role_name
            FROM users u
            JOIN roles r ON r.role_id = u.role_id
            WHERE u.role_id = ? 
            AND edu_id = ?
            LIMIT 1`,
            [roles.user.role_id, eduid_user.id],
            (error, result) => {
                if (error) {
                    handleSQLError(res, error)
                }
                else if (result.length > 0) {
                    let userInfo = { ...result[0] }
                    delete userInfo.password

                    req.session.userInfo = userInfo;
                    //res.header('Set-Cookie', `session_id=${cookie_signature.sign(req.sessionID.toString(), SESSION_SECRET)}; SameSite=none; Secure; Path=/; Domain=localhost`);
                    res.status(200).json({ status: 'OK', message: 'eduID login success', result: userInfo });

                }
                else {
                    database.db.query(
                        `INSERT INTO users 
                        (edu_id, edu_uid, firstname, lastname, iss_username, avatar_url, email, role_id)
                        VALUES (?,?,?,?,?,?,?,?)`,
                        [eduid_user.id, eduid_user.uid, eduid_user.first_name, eduid_user.last_name, eduid_user.iss_username, eduid_user.avatar_url, eduid_user.email.toLowerCase(), roles.user.role_id],
                        (error, result) => {
                            if (error) {
                                handleSQLError(res, error)
                            }
                            else {
                                database.db.query(
                                    `SELECT u.*, r.role_name
                                    FROM users u
                                    JOIN roles r ON r.role_id = u.role_id
                                    WHERE u.role_id = ? 
                                    AND edu_id = ?
                                    LIMIT 1`,
                                    [roles.user.role_id, eduid_user.id],
                                    (error, result) => {
                                        if (error) {
                                            handleSQLError(res, error)
                                        }
                                        else if (result.length > 0) {
                                            let userInfo = { ...result[0] }
                                            delete userInfo.password

                                            req.session.userInfo = userInfo;
                                            //res.header('Set-Cookie', `session_id=${cookie_signature.sign(req.sessionID.toString(), SESSION_SECRET)}; SameSite=none; Secure`);
                                            res.status(200).json({ status: 'OK', message: 'User eduID registration success', result: userInfo });

                                        }
                                        else {
                                            res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
                                        }
                                    });
                            }
                        });
                }
            });
    }
});

authRouter.post('/admin-register', (req, res) => {
    //{user data...}
    //select admin users where email, check if email is taken
    //if missing data send 400 bad request
    //if taken send 401 unauthorized
    //else set req.session.userInfo, cookie header, send userInfo
    const { firstname, lastname, email, password, admin_secret } = req.body;
    console.log('attempting registration:', firstname, lastname, email, password, admin_secret);

    if (!(firstname?.length > 0 && lastname?.length > 0 && email?.length > 0 && password?.length > 0 && admin_secret?.length > 0 && admin_secret === ADMIN_SECRET)) {
        res.status(400).json({ status: 'Bad Request', message: 'Invalid or missing data' });
    }
    else {
        database.db.query(
            `SELECT email
            FROM users
            WHERE LOWER(email) = LOWER(?)
            LIMIT 1`,
            [email],
            (error, result) => {
                if (error) {
                    handleSQLError(res, error)
                }
                else if (result.length > 0) {
                    res.status(401).json({ status: 'Unauthorized', message: 'Email is already taken' });
                }
                else {
                    bcrypt.hash(password, saltRounds, (error, hash) => {
                        if (error) {
                            console.log(error)
                            res.status(500).json({ status: 'bcrypt Error' });
                        }
                        else {
                            database.db.query(
                                `INSERT INTO users 
                                (firstname, lastname, email, password, role_id)
                                VALUES (?,?,?,?,?)`,
                                [firstname, lastname, email.toLowerCase(), hash, roles.admin.role_id],
                                (error, result) => {
                                    if (error) {
                                        handleSQLError(res, error)
                                    }
                                    else {
                                        res.status(200).json({ status: 'OK', message: 'Admin registration success' });
                                    }
                                });
                        }
                    });
                }
            }
        );
    }
});

authRouter.post('/admin-login', (req, res) => {
    //{email, password}
    //select admins where email, check if password matches
    //if true set req.session.userInfo, cookie header, send userInfo
    //else send 401 unauthenticated
    const { email, password } = req.body;
    console.log(email, password)
    database.db.query(
        `SELECT u.*, r.role_name
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.role_id = ? 
        AND LOWER(email) = LOWER(?)
        LIMIT 1`,
        [roles.admin.role_id, email],
        (error, result) => {
            if (error) {
                handleSQLError(res, error)
            }
            else if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        let userInfo = { ...result[0] }
                        delete userInfo.password

                        req.session.userInfo = userInfo;
                        //res.header('Set-Cookie', `session_id=${cookie_signature.sign(req.sessionID.toString(), SESSION_SECRET)}; SameSite=none; Secure`);
                        res.status(200).json({ status: 'OK', message: 'Admin login success', result: userInfo });
                    }
                    else {
                        res.status(401).json({ status: 'Unauthorized', message: 'Invalid password' });
                    }
                })
            }
            else {
                res.status(404).json({ status: 'Unauthorized', message: 'Admin not found' });
            }
        });
});

authRouter.get('/logout', (req, res) => {
    //delete session
    //delete cookie
    //if user logout from eduid as well

    let session_id = req.cookies.session_id

    if (session_id) {

        let unsigned_sessionID = cookie_signature.unsign(session_id, SESSION_SECRET)

        const role_id = req.session?.userInfo?.role_id
        database.db.query(
            `DELETE 
            FROM sessions 
            WHERE session_id = CONVERT(?, CHAR)`,
            [unsigned_sessionID],
            (error, result) => {
                if (error) {
                    handleSQLError(res, error)
                }
                else {
                    req.session.destroy();
                    res.header('Set-Cookie', 'session_id=none; expires=Thu, 01 Jan 1970 00:00:00 GMT; ');
                    res.redirect(`${role_id === roles.user.role_id ? `${EDUID_SERVER_LOGOUT_URL}?redirect_to=` : ''}${ORIGIN_FRONTEND}/${role_id === roles.admin.role_id ? 'admin-' : ''}login`)
                }
            })
    }
});

module.exports = authRouter;