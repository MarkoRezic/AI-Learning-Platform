const express = require('express');
const technologyRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');

technologyRouter.use(embedParamsMiddleware);

technologyRouter.get('/', (req, res) => {
    //select all technologies
    database.db.query(
        `SELECT 
        t.technology_id,
        t.name,
        t.logo_url
        FROM technologies t`,
        [],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Tehnologije pronađene', result: result });
            }
        });
});

technologyRouter.get('/lecture/:lecture_id', (req, res) => {
    //select technologies by lecture_id

    database.db.query(
        `SELECT 
        t.technology_id,
        t.name,
        t.logo_url
        FROM technologies t
        JOIN lecture_technologies l_t ON l_t.technology_id = t.technology_id
        WHERE l_t.lecture_id = ?`,
        [req.params.lecture_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Tehnologije pronađene', result: result });
            }
        });
});

technologyRouter.get('/:technology_id', (req, res) => {
    //select technology by technology_id

    database.db.query(
        `SELECT 
        t.technology_id,
        t.name,
        t.logo_url
        FROM technologies t
        WHERE t.technology_id = ?`,
        [req.params.technology_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Tehnologija nije pronađena' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'Tehnologija pronađena', result: result[0] });
                }
            }
        });
});

module.exports = technologyRouter;