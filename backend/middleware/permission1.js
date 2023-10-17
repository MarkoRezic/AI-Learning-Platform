require("dotenv").config();

const express = require("express");
const permission1Middleware = express.Router();
const session1Middleware = require('../middleware/session1.js');
const roles = require("../../frontend/src/constants/roles.js");

permission1Middleware.use("/*", session1Middleware);

permission1Middleware.use("/*", (req, res, next) => {
    //parse user must be authenticated in order to have userInfo from previous req
    //get role_id and check if role is admin
    //if requirements fulfilled call next()
    //else return error status 403 unauthorized

    if (req.userInfo.role_id === roles.admin.role_id) {
        next();
    }
    else {
        res.status(403).json({ status: 'Forbidden', message: 'Admin role is required for this request' });
    }
});

module.exports = permission1Middleware;
