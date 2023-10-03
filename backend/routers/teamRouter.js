const express = require('express');
const teamRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../constants/roles.js');

teamRouter.use(embedParamsMiddleware);

//teamRouter.get(['/', '/:team_id'], permission0Middleware);

teamRouter.get('/', (req, res) => {
    //select all teams
    database.db.query(
        `SELECT 
        t.team_id, 
        t.team_name, 
        t.project_name, 
        t.project_github_link, 
        t.academic_year, 
        t.approved,
        FROM teams t`,
        [],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Timovi pronađeni', result: result });
            }
        });
});

teamRouter.get('/:team_id', (req, res) => {
    //select team with team id
    database.db.query(
        `SELECT 
        t.team_id, 
        t.team_name, 
        t.project_name, 
        t.project_github_link, 
        t.academic_year, 
        t.approved, 
        u.user_id, 
        u.edu_id, 
        u.edu_uid, 
        u.firstname, 
        u.lastname, 
        u.iss_username, 
        u.avatar_url, 
        u.email,
        u.github_profile_link
        FROM teams t
        JOIN team_users t_u ON t_u.team_id = t.team_id
        JOIN users u ON t_u.user_id = u.user_id
        JOIN roles r ON r.role_id = u.role_id
        WHERE t.team_id = ?
        AND u.role_id = ?
        LIMIT 1`,
        [req.params.team_id, roles.user.role_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Tim nije pronađen' });
                }
                else {
                    let first_member = result[0]
                    let team = {
                        team_id: first_member?.team_id,
                        team_name: first_member?.team_name,
                        project_name: first_member?.project_name,
                        project_github_link: first_member?.project_github_link,
                        academic_year: first_member?.academic_year,
                        approved: first_member?.approved,
                        users: [],
                    }
                    for (let team_user of result) {
                        team.users.push({
                            user_id: team_user?.user_id,
                            edu_id: team_user?.edu_id,
                            edu_uid: team_user?.edu_uid,
                            firstname: team_user?.firstname,
                            lastname: team_user?.lastname,
                            iss_username: team_user?.iss_username,
                            avatar_url: team_user?.avatar_url,
                            email: team_user?.email,
                            github_profile_link: team_user?.github_profile_link,
                        })
                    }
                    res.status(200).json({ status: 'OK', message: 'Tim pronađen', result: team });
                }
            }
        });
});

teamRouter.get('/user/:user_id', (req, res) => {
    //select teams with user id
    console.log("USER ID", req.params.user_id)
    database.db.query(
        `SELECT 
        t.team_id, 
        t.team_name, 
        t.project_name, 
        t.project_github_link, 
        t.academic_year, 
        t.approved
        FROM teams t
        JOIN team_users t_u ON t_u.team_id = t.team_id
        JOIN users u ON t_u.user_id = u.user_id
        JOIN roles r ON r.role_id = u.role_id
        WHERE u.user_id = ?
        AND u.role_id = ?`,
        [req.params.user_id, roles.user.role_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Timovi pronađeni', result: result });
            }
        });
});

module.exports = teamRouter;