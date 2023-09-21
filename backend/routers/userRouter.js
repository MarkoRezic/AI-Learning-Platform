require('dotenv').config();
const {
    GMAIL_USER,
    GMAIL_PASS,
    JWT_SECRET,
    ORIGIN_FRONTEND,
} = process.env;

const express = require('express');
const userRouter = express.Router();
const database = require('../database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const session0Middleware = require('../middleware/session0.js')
const session1Middleware = require('../middleware/session1.js')
const permission1Middleware = require('../middleware/permission1.js')

userRouter.get(['/', '/:user_id', '/permissions/:user_id'], permission1Middleware);
userRouter.post(['/password-reset', '/password-reset/:jwt'], session0Middleware);
userRouter.post(['/permission/:user_id/:roadbook_id'], permission1Middleware);
userRouter.put(['/name', '/password'], session1Middleware);
userRouter.delete(['/permission/:user_id/:roadbook_id'], permission1Middleware);
userRouter.delete(['/:user_id'], permission2Middleware);

userRouter.get('/', (req, res) => {
    //select all users
    database.db.query(
        `SELECT u.user_id, u.email, u.first_name, u.last_name, u.approved, r.*
        FROM users u
        JOIN roles r ON r.role_id = u.role_id`,
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'GET users success', result: result });
            }
        });
});

userRouter.get('/:user_id', (req, res) => {
    //select user with user id
    database.db.query(
        `SELECT u.user_id, u.email, u.first_name, u.last_name, u.approved, r.*
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.user_id = ?
        LIMIT 1`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'User with requested ID not found' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'GET user success', result: result[0] });
                }
            }
        });
});

userRouter.get('/permissions/:user_id', (req, res) => {
    //select roadbook_users where user_id
    database.db.query(
        `SELECT r.*, c.*, CONCAT(uc.first_name, ' ', uc.last_name) as creator_name
        FROM roadbook_users ru
        LEFT JOIN roadbooks r ON r.roadbook_id = ru.roadbook_id
        LEFT JOIN users u ON u.user_id = ru.user_id
        LEFT JOIN users uc ON uc.user_id = r.creator_id
        LEFT JOIN companies c ON c.company_id = r.company_id
        WHERE ru.user_id = ?`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'GET permissions by user ID success', result });
            }
        });
});

userRouter.post('/password-reset', (req, res) => {
    //{email}
    //Check if email exists
    //If true, send an html email with password reset link to front/password-reset/:jwt
    //else return error status 404 not found
    const { email } = req.body;
    database.db.query(
        `SELECT email
        FROM users u
        WHERE LOWER(email) = LOWER(?)
        LIMIT 1`,
        [email],
        (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ status: 'SQL Error' });
            }
            else if (result.length > 0) {
                jwt.sign(
                    { email },
                    JWT_SECRET,
                    { expiresIn: '1h' },
                    (error, emailToken) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ status: 'JWT Error' });
                        }
                        else {
                            const jwt_link = `${ORIGIN_FRONTEND}/password-reset/${emailToken}`;

                            transporter.sendMail({
                                from: `TRS Roadbook ${GMAIL_USER}`,
                                to: email,
                                subject: `Password reset`,
                                html: `
                                    <div>
                                        <h3>Password reset</h3>
                                        <h4>To reset your password, please click the link below</h4>
                                        <br /><br />
                                        <p>${jwt_link}</p>
                                    </div>
                                `,
                            });
                            res.status(200).json({ status: 'OK', message: 'Email sent' });
                        }
                    },
                );
            }
            else {
                res.status(401).json({ status: 'Unauthorized', message: 'User not found' });
            }
        });
});

userRouter.post('/password-reset/:jwt', (req, res) => {
    //{new_password}
    //decode email from jwt
    //update user set password to new_password where email
    //if jwt expired return error status 400
    const { new_password } = req.body;
    jwt.verify(req.params.jwt, JWT_SECRET,
        (error, decoded) => {
            if (error) {
                console.log(error)
                res.status(400).json({ status: 'Bad Request', message: 'Invalid or expired token' });
            }
            else {
                bcrypt.hash(new_password, saltRounds, (error, hash) => {
                    if (error) {
                        console.log(error)
                        res.status(500).json({ status: 'bcrypt Error' });
                    }
                    else {
                        database.db.query(
                            `UPDATE users 
                            SET password = ?
                            WHERE LOWER(email) = LOWER(?)`,
                            [hash, decoded.email],
                            (error, result) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json({ status: 'SQL Error' });
                                }
                                else {
                                    res.status(200).json({ status: 'OK', message: 'POST user password reset success' });
                                }
                            });
                    }
                });
            }
        });
});

userRouter.post('/permission/:user_id/:roadbook_id', (req, res) => {
    //insert roadbook_user with roadbook_id and user_id (ignore if exists)
    database.db.query(
        `INSERT INTO 
        roadbook_users (roadbook_id, user_id) 
        SELECT ?,? 
        FROM DUAL 
        WHERE NOT EXISTS 
            (SELECT * 
            FROM roadbook_users 
            WHERE roadbook_id = ? 
            AND user_id = ? 
            LIMIT 1)`,
        [req.params.roadbook_id, req.params.user_id, req.params.roadbook_id, req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'POST permission for user success', result });
            }
        });
});

userRouter.put('/name', (req, res) => {
    //{first_name, last_name}
    //update set last_name, first_name where user_id from session
    //update userInfo in session data
    console.log(req.body)
    const { first_name, last_name } = req.body
    if (first_name != null && last_name != null) {
        database.db.query(
            `UPDATE users 
            SET first_name = ?, last_name = ?
            WHERE user_id = ?`,
            [first_name, last_name, req.userInfo.user_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'SQL Error' });
                }
                else {
                    database.db.query(
                        `SELECT * 
                        FROM sessions 
                        WHERE session_id = ?
                        LIMIT 1`,
                        [req.sessionInfo.sessionID],
                        (error, result) => {
                            if (error) {
                                console.log(error.message);
                                res.status(500).json({ status: 'SQL Error' });
                            }
                            else {
                                let session_data = JSON.parse(result[0].data);
                                session_data['userInfo']['first_name'] = first_name
                                session_data['userInfo']['last_name'] = last_name

                                database.db.query(
                                    `UPDATE sessions 
                                    SET data = ? 
                                    WHERE session_id = ?`,
                                    [JSON.stringify(session_data), req.sessionInfo.sessionID],
                                    (error, result) => {
                                        if (error) {
                                            console.log(error.message);
                                            res.status(500).json({ status: 'SQL Error' });
                                        }
                                        else {
                                            res.status(200).json({ status: 'OK', message: 'PUT user name success', result: session_data['userInfo'] });
                                        }
                                    })
                            }
                        })
                }
            });
    }
    else {
        res.status(400).json({ status: 'Bad Request', message: 'Missing parameters' });
    }
});

userRouter.put('/password', (req, res) => {
    //{old_password, new_password}
    //update set password to new_password where user_id from session
    console.log(req.body)
    const { old_password, new_password } = req.body
    if (old_password != null && new_password != null) {
        database.db.query(
            `SELECT password
            FROM users
            WHERE user_id = ?
            LIMIT 1`,
            [req.userInfo.user_id],
            (error, result) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: 'SQL Error' });
                }
                else if (result.length > 0) {
                    bcrypt.compare(old_password, result[0].password, (error, response) => {
                        if (response) {
                            bcrypt.hash(new_password, saltRounds, (error, hash) => {
                                if (error) {
                                    console.log(error)
                                    res.status(500).json({ status: 'bcrypt Error' });
                                }
                                else {
                                    database.db.query(
                                        `UPDATE users 
                                            SET password = ?
                                            WHERE user_id = ?`,
                                        [hash, req.userInfo.user_id],
                                        (error, result) => {
                                            if (error) {
                                                console.log(error);
                                                res.status(500).json({ status: 'SQL Error' });
                                            }
                                            else {
                                                res.status(200).json({ status: 'OK', message: 'PUT user password success' });
                                            }
                                        });
                                }
                            });
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
    }
    else {
        res.status(400).json({ status: 'Bad Request', message: 'Missing parameters' });
    }
});

userRouter.put('/approve/:user_id', (req, res) => {
    //update set approved = 1 where user_id
    database.db.query(
        `UPDATE users 
        SET approved = 1
        WHERE user_id = ?`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'PUT approve user success', result });
            }
        });
});

userRouter.delete('/permission/:user_id/:roadbook_id', (req, res) => {
    //delete roadbook_user with roadbook_id and user_id
    database.db.query(
        `DELETE
        FROM roadbook_users
        WHERE roadbook_id = ?
        AND user_id = ?`,
        [req.params.roadbook_id, req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'DELETE permission for user success', result });
            }
        });
});

userRouter.delete('/:user_id', (req, res) => {
    //update user set approved = 0 where id
    database.db.query(
        `UPDATE users 
        SET approved = 0
        WHERE user_id = ?`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'DELETE approve user success', result });
            }
        });
});

module.exports = userRouter;