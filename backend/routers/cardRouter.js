const express = require('express');
const cardRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../constants/roles.js');

cardRouter.use(embedParamsMiddleware);

cardRouter.get('/', (req, res) => {
    //select all cards
    database.db.query(
        `SELECT 
        c.card_id, 
        c.card_type_id, 
        ct.name, 
        ct.text, 
        c.name, 
        c.text, 
        c.question, 
        c.public, 
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id`,
        [],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Kartice pronađene', result: result });
            }
        });
});

cardRouter.get('/:card_id', (req, res) => {
    //select card by card_id

    database.db.query(
        `SELECT 
        c.card_id, 
        c.card_type_id, 
        ct.name card_type_name, 
        ct.text card_type_text, 
        c.name, 
        c.text, 
        c.question, 
        c.public
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        WHERE c.card_id = ?`,
        [req.params.card_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Kartica nije pronađena' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'Kartica pronađena', result: result[0] });
                }
            }
        });
});

cardRouter.get('/user/:user_id', (req, res) => {
    //select cards with user id
    console.log("USER ID", req.params.user_id)
    database.db.query(
        `SELECT 
        c.card_id, 
        c.card_type_id, 
        ct.name, 
        ct.text, 
        c.name, 
        c.text, 
        c.question, 
        c.public, 
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        WHERE c.user_id = ?`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Kartice pronađene', result: result });
            }
        });
});

cardRouter.post('/', (req, res) => {
    //create new card

    const user_id = req.session.userInfo?.user_id;

    const {
        card_type_id,
        name,
        text,
        question,
        public
    } = req.body;

    database.db.query(
        `INSERT
        INTO cards (  
        user_id, 
        card_type_id, 
        name, 
        text, 
        question, 
        public
        )
        VALUES (?,?,?,?,?,?)`,
        [
            user_id,
            card_type_id,
            name,
            text,
            question,
            public
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Kartica kreirana', result: result });
            }
        });
});

cardRouter.put('/:card_id', (req, res) => {
    //update card with card_id

    const {
        card_type_id,
        name,
        text,
        question,
        public
    } = req.body;

    database.db.query(
        `UPDATE
        teams SET
        card_type_id = ?, 
        name = ?, 
        text = ?, 
        question = ?, 
        public = ?
        WHERE card_id = ?`,
        [
            card_type_id,
            name,
            text,
            question,
            public,
            req.params.card_id
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Kartica ažurirana', result: result });
            }
        });
});

module.exports = cardRouter;