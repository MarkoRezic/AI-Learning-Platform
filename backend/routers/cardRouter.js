const express = require('express');
const cardRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../../frontend/src/constants/roles.js');

cardRouter.use(embedParamsMiddleware);

cardRouter.get('/', (req, res) => {
    //select all cards
    database.db.query(
        `SELECT 
        c.card_id, 
        c.card_type_id, 
        ct.name card_type_name, 
        ct.text card_type_text, 
        c.name, 
        c.text, 
        c.question, 
        c.public,
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email,
        u.github_profile_link,
        COUNT(DISTINCT u2.user_id) user_count
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        JOIN users u ON u.user_id = c.user_id
        LEFT JOIN card_users c_u ON c_u.card_id = c.card_id
        LEFT JOIN users u2 ON c_u.user_id = u2.user_id
        GROUP BY c.card_id`,
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

cardRouter.get('/access', (req, res) => {
    //select cards where user has access

    const user_id = req.session.userInfo?.user_id;

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
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email,
        u.github_profile_link,
        COUNT(DISTINCT u2.user_id) user_count
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        JOIN users u ON u.user_id = c.user_id
        LEFT JOIN card_users c_u ON c_u.card_id = c.card_id
        LEFT JOIN users u2 ON c_u.user_id = u2.user_id
        WHERE c.user_id = ?
        OR c.public = 1
        GROUP BY c.card_id`,
        [user_id],
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
        c.public,
        u.user_id creator_id, 
        u.firstname creator_firstname, 
        u.lastname creator_lastname, 
        u.avatar_url creator_avatar_url,
        l.lecture_id,
        l.name lecture_name,
        f.file_id,
        f.name file_name,
        u2.user_id, 
        u2.edu_id, 
        u2.edu_uid, 
        u2.firstname, 
        u2.lastname, 
        u2.iss_username, 
        u2.avatar_url, 
        u2.email,
        u2.github_profile_link
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        JOIN users u ON u.user_id = c.user_id
        LEFT JOIN lectures l ON l.lecture_id = c.lecture_id
        LEFT JOIN files f ON f.file_id = c.file_id
        LEFT JOIN card_users c_u ON c_u.card_id = c.card_id
        LEFT JOIN users u2 ON c_u.user_id = u2.user_id
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
                    let first_member = result[0]
                    let card = {
                        card_id: first_member?.card_id,
                        card_type_id: first_member?.card_type_id,
                        card_type_name: first_member?.card_type_name,
                        card_type_text: first_member?.card_type_text,
                        name: first_member?.name,
                        text: first_member?.text,
                        question: first_member?.question,
                        public: first_member?.public,
                        creator_id: first_member?.creator_id,
                        creator_firstname: first_member?.creator_firstname,
                        creator_lastname: first_member?.creator_lastname,
                        creator_avatar_url: first_member?.creator_avatar_url,
                        lecture_id: first_member?.lecture_id,
                        lecture_name: first_member?.lecture_name,
                        file_id: first_member?.file_id,
                        file_name: first_member?.file_name,
                        users: [],
                    }
                    for (let card_user of result) {
                        if (card_user?.user_id != null) {
                            card.users.push({
                                user_id: card_user?.user_id,
                                edu_id: card_user?.edu_id,
                                edu_uid: card_user?.edu_uid,
                                firstname: card_user?.firstname,
                                lastname: card_user?.lastname,
                                iss_username: card_user?.iss_username,
                                avatar_url: card_user?.avatar_url,
                                email: card_user?.email,
                                github_profile_link: card_user?.github_profile_link,
                            })
                        }
                    }
                    res.status(200).json({ status: 'OK', message: 'Kartica pronađena', result: card });
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
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email,
        u.github_profile_link,
        COUNT(DISTINCT u2.user_id) user_count
        FROM cards c
        JOIN card_types ct ON ct.card_type_id = c.card_type_id
        JOIN users u ON u.user_id = c.user_id
        LEFT JOIN card_users c_u ON c_u.card_id = c.card_id
        LEFT JOIN users u2 ON c_u.user_id = u2.user_id
        WHERE c.user_id = ?
        AND (
        c_u.user_id != ?
        OR c_u.user_id IS NULL
        )
        GROUP BY c.card_id`,
        [
            req.params.user_id,
            req.params.user_id
        ],
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
        lecture_id,
        file_id,
        card_type_id,
        name,
        text,
        question,
        public
    } = req.body;

    database.db.query(
        `INSERT
        INTO cards (  
        ${lecture_id == null ? '' : 'lecture_id,'}
        ${file_id == null ? '' : 'file_id,'}
        user_id, 
        card_type_id, 
        name, 
        text, 
        question, 
        public
        )
        VALUES (${lecture_id == null ? '' : '?,'}${file_id == null ? '' : '?,'}?,?,?,?,?,?)`,
        [
            ...(
                lecture_id != null ? [lecture_id]
                    : file_id != null ? [file_id]
                        : []
            ),
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
        name,
        public,
        users
    } = req.body;

    database.db.query(
        `UPDATE
        cards SET
        name = ?, 
        public = ?
        WHERE card_id = ?`,
        [
            name,
            public,
            req.params.card_id
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                database.db_parallel.query(
                    `DELETE
                    FROM card_users
                    WHERE card_id = ?;

                    ${users?.length > 0 ?
                        `INSERT IGNORE
                        INTO card_users
                        (
                        card_id,
                        user_id
                        ) VALUES ?`
                        : ''
                    }`,
                    [
                        req.params.card_id,
                        users.map((user) => [
                            req.params.card_id,
                            user.user_id
                        ])
                    ],
                    (error, result) => {
                        if (error) {
                            handleSQLError(res, error);
                        }
                        else {
                            res.status(200).json({ status: 'OK', message: 'Kartica ažurirana', result: result });
                        }
                    });
            }
        });
});

module.exports = cardRouter;