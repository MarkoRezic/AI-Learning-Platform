require("dotenv").config();

const express = require("express");
const embedParamsMiddleware = express.Router();

embedParamsMiddleware.use(['/:team_id'], (req, res, next) => {
    //embed params for next requests
    console.log("embedding params")
    req.embededParams = { ...req.params }
    console.log(req.params)
    next();
});

module.exports = embedParamsMiddleware;
