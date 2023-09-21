require('dotenv').config();

const express = require('express');
const projectRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js')
const session1Middleware = require('../middleware/session1.js')
const permission0Middleware = require('../middleware/permission0.js')
const permission1Middleware = require('../middleware/permission1.js')

projectRouter.use(embedParamsMiddleware)

projectRouter.get(['/'], session1Middleware);
projectRouter.get(['/:project_id'], permission0Middleware);
projectRouter.put(['/:project_id'], permission0Middleware);
projectRouter.post(['/'], permission0Middleware);
projectRouter.put(['/approve/:project_id'], permission1Middleware);
projectRouter.delete(['/:project_id'], permission1Middleware);

projectRouter.get('/', (req, res) => {
    //select all projects where user has permission
    //select all projects if admin
    if (req.userInfo.role_name === 'editor') {
        database.db.query(
            `SELECT r.*, c.company_name, CONCAT(u.first_name, ' ', u.last_name) as creator_name
            FROM projects r
            LEFT JOIN project_users ru ON ru.project_id = r.project_id
            JOIN companies c ON c.company_id = r.company_id
            LEFT JOIN users u ON u.user_id = r.creator_id
            WHERE ru.user_id = ?
            AND r.approved = 1
            AND c.approved = 1
            ORDER BY r.date_created`,
            [req.userInfo.user_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'SQL Error' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'GET projects success', result });
                }
            });
    }
    else if (req.userInfo.role_name === 'admin') {
        database.db.query(
            `SELECT r.*, c.company_name, CONCAT(u.first_name, ' ', u.last_name) as creator_name
            FROM projects r
            LEFT JOIN project_users ru ON ru.project_id = r.project_id
            JOIN companies c ON c.company_id = r.company_id
            LEFT JOIN users u ON u.user_id = r.creator_id
            WHERE ru.user_id = ?
            OR r.creator_id = ?
            ORDER BY r.date_created`,
            [req.userInfo.user_id, req.userInfo.user_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'SQL Error' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'GET projects success', result });
                }
            });
    }
    else {
        database.db.query(
            `SELECT r.*, c.company_name, CONCAT(u.first_name, ' ', u.last_name) as creator_name
            FROM projects r
            JOIN companies c ON c.company_id = r.company_id
            LEFT JOIN users u ON u.user_id = r.creator_id
            ORDER BY r.date_created`,
            [req.userInfo.user_id, req.userInfo.user_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'SQL Error' });
                }
                else {
                    res.status(200).json({ status: 'OK', message: 'GET projects success', result });
                }
            });
    }
});

projectRouter.get('/:project_id', (req, res) => {
    //select project and its versions with project_id
    database.db.query(
        `SELECT r.*, c.company_name, CONCAT(u.first_name, ' ', u.last_name) as creator_name, 
        CONCAT('[',
            GROUP_CONCAT(
                CONCAT(
                '{
                    "project_version_id":"', rv.project_version_id, '"
                }')
            ),
        ']') AS project_versions
        FROM projects r
        LEFT JOIN project_versions rv ON rv.project_id = r.project_id
        LEFT JOIN companies c ON c.company_id = r.company_id
        LEFT JOIN users u ON u.user_id = r.creator_id
        WHERE r.project_id = ?
        GROUP BY r.project_id`,
        [req.params.project_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                result = result.map((project) => {
                    project["project_versions"] = JSON.parse(project["project_versions"].replace(/\\"/g, '"'))
                    return project
                })
                res.status(200).json({ status: 'OK', message: 'GET project versions success', result });
            }
        });
});

projectRouter.post('/', (req, res) => {
    //{company_id, campaign_name}
    //insert new project (creator id is user that made the request)
    //after insertion get the project_id, create a project version (Version 0)
    //after insertion get the version_id, create input fields (empty)
    console.log(req.body)
    const { company_id, campaign_name } = req.body
    database.db.query(
        `INSERT
        INTO projects (creator_id, company_id, campaign_name)
        VALUES (?,?,?)`,
        [req.userInfo.user_id, company_id, campaign_name],
        (error, resultproject) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                const project_id = resultproject.insertId
                database.db.query(
                    `INSERT
                    INTO project_versions (project_id)
                    VALUES (?)`,
                    [project_id],
                    (error, resultVersion) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ status: 'SQL Error' });
                        }
                        else {
                            const version_id = resultVersion.insertId
                            database.db.query(
                                `INSERT
                                INTO input_fields (project_version_id, default_input_field_id)
                                SELECT ?, d.default_input_field_id
                                FROM default_input_fields d`,
                                [version_id],
                                (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        res.status(500).json({ status: 'SQL Error' });
                                    }
                                    else {
                                        res.status(200).json({ status: 'OK', message: 'POST project success', result });
                                    }
                                });
                        }
                    });
            }
        });
});

projectRouter.put('/:project_id', (req, res) => {
    //{company_id, campaign_name}
    //update project data with project_id
    console.log(req.body)
    const { company_id, campaign_name } = req.body
    database.db.query(
        `UPDATE projects 
        SET company_id = ?, campaign_name = ?
        WHERE project_id = ?`,
        [company_id, campaign_name, req.params.project_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'PUT project success', result });
            }
        });
});

projectRouter.put('/approve/:project_id', (req, res) => {
    //update project set approved = 1 with project_id
    database.db.query(
        `UPDATE projects 
        SET approved = 1
        WHERE project_id = ?`,
        [req.params.project_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'PUT approved project success', result });
            }
        });
});

projectRouter.delete('/:project_id', (req, res) => {
    //update project set approved = 0 with project_id
    database.db.query(
        `UPDATE projects 
        SET approved = 0
        WHERE project_id = ?`,
        [req.params.project_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'SQL Error' });
            }
            else {
                res.status(200).json({ status: 'OK', message: 'DELETE approved project success', result });
            }
        });
});

module.exports = projectRouter;