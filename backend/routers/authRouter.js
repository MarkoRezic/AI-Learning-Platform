require('dotenv').config();
const {
    SESSION_SECRET,
    ENVIRONMENT
} = process.env;

const express = require('express');
const authRouter = express.Router();
const database = require('../database.js');
const cookie_signature = require('cookie-signature');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session0Middleware = require('../middleware/session0.js')
const session1Middleware = require('../middleware/session1.js')

authRouter.post(['/login', '/register'], session0Middleware);
authRouter.get(['/'], session1Middleware);
authRouter.delete(['/logout'], session1Middleware);

authRouter.get('/', (req, res) => {
    //select users where user_id from req.userInfo.user_id
    //gets current user data
    database.db.query(
        `SELECT u.*, r.role_name
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE user_id = ?
        LIMIT 1`,
        [req.userInfo.user_id],
        (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ status: 'SQL Error' });
            }
            else if (result.length > 0) {
                res.status(200).json({ status: 'OK', message: 'Authentication success', result: req.userInfo });
            }
            else {
                res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
            }
        });
});

authRouter.post('/login', (req, res) => {
    //{eduID token}
    //find user where eduID matches
    //if true set req.session.userInfo, cookie header, send userInfo
    //else send 401 unauthenticated
    const { email, password } = req.body;
    database.db.query(
        `SELECT u.*, r.role_name
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE LOWER(email) = LOWER(?)
        LIMIT 1`,
        [email],
        (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ status: 'SQL Error' });
            }
            else if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        let userInfo = userInfoModel(result)

                        req.session.userInfo = userInfo;
                        res.header('Set-Cookie', `roadbook_session_id=${cookie_signature.sign(req.sessionID.toString(), SESSION_SECRET)}; SameSite=lax; Path=/; ${ENVIRONMENT === 'local' ? 'Domain=localhost;' : ''} ${ENVIRONMENT === 'local' ? '' : 'HttpOnly;'} ${ENVIRONMENT === 'local' ? '' : 'Secure'}`);
                        res.status(200).json({ status: 'OK', message: 'Login success', result: userInfo });
                    }
                    else {
                        res.status(401).json({ status: 'Unauthorized', message: 'Invalid password' });
                    }
                })
            }
            else {
                res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
            }
        });
});

authRouter.post('/admin-login', (req, res) => {
    //{email, password}
    //select admins where email, check if password matches
    //if true set req.session.userInfo, cookie header, send userInfo
    //else send 401 unauthenticated
    const { email, password } = req.body;
    database.db.query(
        `SELECT u.*, r.role_name
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE LOWER(email) = LOWER(?)
        LIMIT 1`,
        [email],
        (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ status: 'SQL Error' });
            }
            else if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        let userInfo = userInfoModel(result)

                        req.session.userInfo = userInfo;
                        res.header('Set-Cookie', `roadbook_session_id=${cookie_signature.sign(req.sessionID.toString(), SESSION_SECRET)}; SameSite=lax; Path=/; ${ENVIRONMENT === 'local' ? 'Domain=localhost;' : ''} ${ENVIRONMENT === 'local' ? '' : 'HttpOnly;'} ${ENVIRONMENT === 'local' ? '' : 'Secure'}`);
                        res.status(200).json({ status: 'OK', message: 'Login success', result: userInfo });
                    }
                    else {
                        res.status(401).json({ status: 'Unauthorized', message: 'Invalid password' });
                    }
                })
            }
            else {
                res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
            }
        });
});

authRouter.delete('/logout', (req, res) => {
    //delete session
    //delete cookie

    let roadbook_session_id = req.cookies.roadbook_session_id

    if (roadbook_session_id) {

        let unsigned_sessionID = cookie_signature.unsign(roadbook_session_id, SESSION_SECRET)

        database.db.query(
            `DELETE 
            FROM sessions 
            WHERE session_id = ?`,
            [unsigned_sessionID],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'SQL Error' });
                }
                else {
                    req.session.destroy();
                    res.header('Set-Cookie', 'roadbook_session_id=none; expires=Thu, 01 Jan 1970 00:00:00 GMT; ');
                    res.status(200).json({ status: 'OK', message: 'Logout success' });
                }
            })
    }
});

module.exports = authRouter;