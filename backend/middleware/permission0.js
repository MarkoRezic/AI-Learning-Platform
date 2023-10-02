require("dotenv").config();

const express = require("express");
const permission0Middleware = express.Router();
const session1Middleware = require('../middleware/session1.js')

permission0Middleware.use("/*", session1Middleware);

permission0Middleware.use("/*", (req, res, next) => {
    //parse user must be authenticated in order to have userInfo from previous req
    //get role_id and check if role is user
    //if user then check if they have the required permission for the requested resource
    //if requirements fulfilled or role is admin or no params are sent call next()
    //else return error status 403 unauthorized

    if (req.embededParams.project_id != null) {
        //USER
        if (req.userInfo.role_id === roles.user.role_id) {
        }
        //ADMIN
        else {
            next();
        }
    }
    else {
        res.status(400).json({ status: 'Bad Request', message: 'Missing parameters' });
    }
});

module.exports = permission0Middleware;
