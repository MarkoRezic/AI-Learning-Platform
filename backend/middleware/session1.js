require("dotenv").config();
const { SESSION_SECRET, ENVIRONMENT } = process.env;

const express = require("express");
const cookie_signature = require('cookie-signature');
const session1Middleware = express.Router();
const database = require("../database.js");

session1Middleware.use("/*", (req, res, next) => {
    //parse cookie and check if session exists with that id
    //return error status 401 unauthorized if it doesnt
    //else append userInfo to req, and call next()

    let session_id = req.cookies.session_id

    //console.log(req.cookies)
    console.log("SESSION ID", session_id)
    //console.log(req.sessionID)

    if (session_id != null && cookie_signature.unsign(session_id, SESSION_SECRET) !== false) {

        let unsigned_sessionID = cookie_signature.unsign(session_id, SESSION_SECRET)
        //console.log("UNSIGNED SESSION ID", unsigned_sessionID)

        database.db.query(
            `SELECT * 
            FROM sessions 
            WHERE session_id = ?`,
            [unsigned_sessionID],
            (error, result) => {
                if (error) {
                    console.log(error.message);
                    res.status(500).json({ status: 'SQL Error' });
                }
                if (result.length > 0) {
                    let session_data = JSON.parse(result[0].data);
                    let userInfo = session_data['userInfo'];
                    req.userInfo = userInfo;
                    req.sessionInfo = {
                        sessionID: unsigned_sessionID
                    }
                    next();
                }
                else {
                    res.status(401).json({ status: 'Unauthorized', message: 'User not logged in' });
                }
            })
    }
    else {
        //for localhost
        if (session_id != null && ENVIRONMENT === 'local') {
            let unsigned_sessionID = session_id.split('.')[0].split(':')[1]
            //console.log("UNSIGNED SESSION ID", unsigned_sessionID)

            database.db.query(
                `SELECT * 
                FROM sessions 
                WHERE session_id = CONVERT(?, CHAR)`,
                [unsigned_sessionID],
                (error, result) => {
                    if (error) {
                        console.log(error.message);
                        res.status(500).json({ status: 'SQL Error' });
                    }
                    if (result.length > 0) {
                        let session_data = JSON.parse(result[0].data);
                        let userInfo = session_data['userInfo'];
                        req.userInfo = userInfo;
                        req.sessionInfo = {
                            sessionID: unsigned_sessionID
                        }
                        next();
                    }
                    else {
                        res.status(401).json({ status: 'Unauthorized', message: 'User not logged in' });
                    }
                })
        }
        else {
            res.status(401).json({ status: 'Unauthorized', message: 'User not logged in' });
        }
    }
});

module.exports = session1Middleware;
