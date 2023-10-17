const express = require('express');
const lectureRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../../frontend/src/constants/roles.js');
const convertArrayToJsonTree = require('../utils/convert_array_to_json_tree.js');
const existsInJsonTree = require('../utils/exists_in_json_tree.js');

lectureRouter.use(embedParamsMiddleware);

lectureRouter.get('/', (req, res) => {
    //select all lectures
    database.db.query(
        `SELECT 
        l.lecture_id,
        l.parent_lecture_id,
        l.name,
        l.description,
        l.keywords,
        l.text,
        l.html
        FROM lectures l`,
        [],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                let lectures = convertArrayToJsonTree(result);
                res.status(200).json({ status: 'OK', message: 'Lekcije pronađene', result: lectures });
            }
        });
});

lectureRouter.get('/:lecture_id', (req, res) => {
    //select lecture by lecture_id

    const user_id = req.session.userInfo?.user_id;
    console.log("LECTURE ID", req.params.lecture_id)
    console.log("USER ID", user_id)

    database.db.query(
        `SELECT 
        l.lecture_id,
        l.parent_lecture_id,
        l.name,
        l.description,
        l.keywords,
        l.text,
        l.html,
        l3.name parent_lecture_name,
        l2.lecture_id child_lecture_id,
        l2.parent_lecture_id child_parent_lecture_id,
        l2.name child_name,
        l2.description child_description,
        l2.keywords child_keywords,
        l2.text child_text,
        l2.html child_html,
        l_u.user_id
        FROM lectures l
        LEFT JOIN lectures l2 ON l2.parent_lecture_id = l.lecture_id
        LEFT JOIN lectures l3 ON l3.lecture_id = l.parent_lecture_id
        LEFT JOIN lecture_users l_u ON l_u.lecture_id = l.lecture_id
        AND (
        l_u.user_id = ? 
        OR l_u.user_id IS NULL
        )
        WHERE l.lecture_id = ?`,
        [
            user_id,
            req.params.lecture_id,
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Lekcija nije pronađena' });
                }
                else {
                    let first_member = result[0]
                    let lecture = {
                        lecture_id: first_member?.lecture_id,
                        parent_lecture_id: first_member?.parent_lecture_id,
                        parent_lecture_name: first_member?.parent_lecture_name,
                        name: first_member?.name,
                        description: first_member?.description,
                        keywords: first_member?.keywords,
                        text: first_member?.text,
                        html: first_member?.html,
                        user_id: first_member?.user_id,
                        child_lectures: [],
                    }
                    for (let child_lecture of result) {
                        if (child_lecture?.child_lecture_id != null) {
                            lecture.child_lectures.push({
                                lecture_id: child_lecture?.child_lecture_id,
                                parent_lecture_id: child_lecture?.child_parent_lecture_id,
                                name: child_lecture?.child_name,
                                description: child_lecture?.child_description,
                                keywords: child_lecture?.child_keywords,
                                text: child_lecture?.child_text,
                                html: child_lecture?.child_html,
                            })
                        }
                    }
                    res.status(200).json({ status: 'OK', message: 'Lekcija pronađena', result: lecture });
                }
            }
        });
});

lectureRouter.get('/user/:user_id', (req, res) => {
    //select lectures with user id
    console.log("USER ID", req.params.user_id)
    database.db.query(
        `SELECT 
        l.lecture_id,
        l.parent_lecture_id,
        l.name,
        l.description,
        l.keywords,
        l.text,
        l.html
        FROM lectures l
        JOIN lecture_users l_u ON l_u.lecture_id = l.lecture_id
        JOIN users u ON u.user_id = l_u.user_id
        WHERE u.user_id = ?`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                let lectures = convertArrayToJsonTree(result);
                for (let lecture of result) {
                    if (existsInJsonTree(lectures, lecture) === false) {
                        lectures.push(lecture);
                    }
                }

                res.status(200).json({ status: 'OK', message: 'Lekcije pronađene', result: lectures });
            }
        });
});

lectureRouter.post('/', (req, res) => {
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

lectureRouter.put('/:card_id', (req, res) => {
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

lectureRouter.put('/join/:lecture_id', (req, res) => {
    //join a lecture with lecture_id

    const user_id = req.session.userInfo?.user_id;

    database.db_parallel.query(
        `INSERT IGNORE
        INTO lecture_users
        (
            lecture_id,
            user_id
        ) 
        VALUES (?,?)`,
        [
            req.params.lecture_id,
            user_id
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Lekcija zapraćena', result: result });
            }
        });
});

lectureRouter.delete('/leave/:lecture_id', (req, res) => {
    //leave a lecture with lecture_id

    const user_id = req.session.userInfo?.user_id;

    database.db_parallel.query(
        `DELETE
        FROM lecture_users
        WHERE lecture_id = ?
        AND user_id = ?`,
        [
            req.params.lecture_id,
            user_id
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Lekcija otpraćena', result: result });
            }
        });
});

module.exports = lectureRouter;