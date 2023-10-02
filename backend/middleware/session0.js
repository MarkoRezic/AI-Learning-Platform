require("dotenv").config();
const { SESSION_SECRET, ENVIRONMENT } = process.env;

const express = require("express");
const cookie_signature = require('cookie-signature');
const session0Middleware = express.Router();
const database = require("../database.js");

session0Middleware.use("/*", (req, res, next) => {
    //parse cookie and check if session exists with that id
    //return error status 403 unathorized if it does, else next()

    let session_id = req.cookies.session_id
    //console.log("COOKIES", req.cookies)
    //console.log("COOKIE SESSION ID", session_id)
    //console.log("SESSION ID", req.sessionID)
    //console.log("TEST", req.get('Cookie'))

    if (session_id != null) {
        let unsigned_sessionID = ENVIRONMENT === 'local' ? session_id.split('.')[0].split(':')[1] : cookie_signature.unsign(session_id, SESSION_SECRET)
        //console.log("UNSIGNED", unsigned_sessionID)

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
                    res.status(403).json({ status: 'Forbidden', message: 'User is already logged in' });
                }
                else {
                    next();
                }
            })
    }
    else {
        next();
    }
});

module.exports = session0Middleware;
