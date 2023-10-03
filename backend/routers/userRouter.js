const express = require('express');
const userRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission1Middleware = require('../middleware/permission1.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../constants/roles.js');

userRouter.use(embedParamsMiddleware);

userRouter.get(['/', '/:user_id'], permission1Middleware);

userRouter.get('/', (req, res) => {
    //select all users
    database.db.query(
        `SELECT 
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email, 
        u.github_profile_link,
        r.*
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.role_id = ?`,
        [roles.user.role_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Korisnici pronađeni', result: result });
            }
        });
});

userRouter.get('/:user_id', (req, res) => {
    //select user with user id
    database.db.query(
        `SELECT 
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email,
        u.github_profile_link, 
        r.*
        FROM users u
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.user_id = ?
        AND u.role_id = ?
        LIMIT 1`,
        [req.params.user_id, roles.user.role_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Korisnik nije pronađen' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'Korisnik pronađen', result: result[0] });
                }
            }
        });
});

module.exports = userRouter;