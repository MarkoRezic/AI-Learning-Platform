require("dotenv").config();

const express = require("express");
const embedParamsMiddleware = express.Router();

embedParamsMiddleware.use(['/version/:version_id', '/edit/:roadbook_id', '/unlock/:roadbook_id', '/visible/:roadbook_id', '/permission/:user_id/:roadbook_id', '/:roadbook_id'], (req, res, next) => {
    //embed params for next requests
    console.log("embedding params")
    req.embededParams = { ...req.params }
    console.log(req.params)
    next();
});

module.exports = embedParamsMiddleware;
