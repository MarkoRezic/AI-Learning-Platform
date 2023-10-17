require('dotenv').config();
const {
    ORIGIN_FRONTEND,
    ORIGIN_FRONTEND_IP,
    ORIGIN_BACKEND,
} = process.env;

const express = require('express');
const fileRouter = express.Router();
const database = require('../database.js');
const embedParamsMiddleware = require('../middleware/embedParams.js');
const permission0Middleware = require('../middleware/permission0.js');
const handleSQLError = require('../middleware/handleSQLError.js');
const roles = require('../../frontend/src/constants/roles.js');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const getExtension = require('../utils/get_extension.js');
const { readPdfText } = require('pdf-text-reader');
const fs = require('fs');
const uploads_path = require('../../frontend/src/constants/uploads_path.js');
const textract = require('textract');

var storage = multer.diskStorage(
    {
        destination: 'public/uploads/',
        filename: function (req, file, cb) {
            let file_elements = file.originalname.split(".");
            let extension = "";
            if (file_elements.length >= 2) {
                extension = file_elements[file_elements.length - 1]
            }

            cb(null, `${uuidv4()}.${extension}`);
        }
    }
);

const upload = multer({ storage })

fileRouter.use(embedParamsMiddleware);

fileRouter.get('/', (req, res) => {
    //select all files

    database.db.query(
        `SELECT 
        f.file_id, 
        f.file_type_id, 
        ft.name file_type_name, 
        ft.text file_type_text, 
        f.uuid_name, 
        f.name, 
        f.public,
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
        FROM files f
        JOIN file_types ft ON ft.file_type_id = f.file_type_id
        JOIN users u ON u.user_id = f.user_id
        LEFT JOIN file_users f_u ON f_u.file_id = f.file_id
        LEFT JOIN users u2 ON f_u.user_id = u2.user_id
        GROUP BY f.file_id`,
        [],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Datoteke pronađene', result: result });
            }
        });
});

fileRouter.get('/access', (req, res) => {
    //select files where user has access

    const user_id = req.session.userInfo?.user_id;

    database.db.query(
        `SELECT 
        f.file_id, 
        f.file_type_id, 
        ft.name file_type_name, 
        ft.text file_type_text, 
        f.uuid_name, 
        f.name, 
        f.public,
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
        FROM files f
        JOIN file_types ft ON ft.file_type_id = f.file_type_id
        JOIN users u ON u.user_id = f.user_id
        LEFT JOIN file_users f_u ON f_u.file_id = f.file_id
        LEFT JOIN users u2 ON f_u.user_id = u2.user_id
        WHERE f.user_id = ?
        OR f.public = 1
        GROUP BY f.file_id`,
        [
            user_id,
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Datoteke pronađene', result: result });
            }
        });
});

fileRouter.get('/:file_id', (req, res) => {
    //select file by file_id

    database.db.query(
        `SELECT 
        f.file_id, 
        f.file_type_id, 
        ft.name file_type_name, 
        ft.text file_type_text, 
        f.uuid_name, 
        f.name, 
        f.public,
        u.user_id creator_id, 
        u.firstname creator_firstname, 
        u.lastname creator_lastname, 
        u.avatar_url creator_avatar_url,
        u2.user_id, 
        u2.edu_id, 
        u2.edu_uid, 
        u2.firstname, 
        u2.lastname, 
        u2.iss_username, 
        u2.avatar_url, 
        u2.email,
        u2.github_profile_link
        FROM files f
        JOIN file_types ft ON ft.file_type_id = f.file_type_id
        JOIN users u ON u.user_id = f.user_id
        LEFT JOIN file_users f_u ON f_u.file_id = f.file_id
        LEFT JOIN users u2 ON f_u.user_id = u2.user_id
        WHERE f.file_id = ?`,
        [req.params.file_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Datoteka nije pronađena' });
                }
                else {
                    let first_member = result[0]
                    let file = {
                        file_id: first_member?.file_id,
                        file_type_id: first_member?.file_type_id,
                        file_type_name: first_member?.file_type_name,
                        file_type_text: first_member?.file_type_text,
                        uuid_name: first_member?.uuid_name,
                        file_url: `${ORIGIN_BACKEND}${uploads_path.replace("public", "")}${first_member?.uuid_name}`,
                        name: first_member?.name,
                        public: first_member?.public,
                        creator_id: first_member?.creator_id,
                        creator_firstname: first_member?.creator_firstname,
                        creator_lastname: first_member?.creator_lastname,
                        creator_avatar_url: first_member?.creator_avatar_url,
                        users: [],
                    }
                    console.log(file)
                    for (let file_user of result) {
                        if (file_user?.user_id != null) {
                            file.users.push({
                                user_id: file_user?.user_id,
                                edu_id: file_user?.edu_id,
                                edu_uid: file_user?.edu_uid,
                                firstname: file_user?.firstname,
                                lastname: file_user?.lastname,
                                iss_username: file_user?.iss_username,
                                avatar_url: file_user?.avatar_url,
                                email: file_user?.email,
                                github_profile_link: file_user?.github_profile_link,
                            })
                        }
                    }
                    res.status(200).json({ status: 'OK', message: 'Datoteka pronađena', result: file });
                }
            }
        });
});

fileRouter.get('/user/:user_id', (req, res) => {
    //select files with user id
    console.log("USER ID", req.params.user_id)
    database.db.query(
        `SELECT 
        f.file_id, 
        f.file_type_id, 
        ft.name file_type_name, 
        ft.text file_type_text, 
        f.uuid_name, 
        f.name, 
        f.public,
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
        FROM files f
        JOIN file_types ft ON ft.file_type_id = f.file_type_id
        JOIN users u ON u.user_id = f.user_id
        LEFT JOIN file_users f_u ON f_u.file_id = f.file_id
        LEFT JOIN users u2 ON f_u.user_id = u2.user_id
        WHERE f.user_id = ?
        GROUP BY f.file_id`,
        [req.params.user_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Datoteke pronađene', result: result });
            }
        });
});

fileRouter.get('/extract/:file_id', (req, res) => {
    //extract file text by file_id

    database.db.query(
        `SELECT 
        f.uuid_name
        FROM files f
        WHERE f.file_id = ?`,
        [req.params.file_id],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                if (result.length === 0) {
                    res.status(404).json({ status: 'Not Found', message: 'Kartica nije pronađena' });
                }
                else {
                    let uuid_name = result[0]?.uuid_name;
                    let extension = getExtension(uuid_name);

                    textract.fromFileWithPath(`${uploads_path}${uuid_name}`, async (error, data) => {
                        if (error) {
                            console.log("PARSE ERROR", error);
                            if (extension === "zip") {
                                data = "";
                            }
                            else if (extension === "pdf") {
                                data = await readPdfText({ url: `${uploads_path}${uuid_name}` });
                            }
                            else {
                                try {
                                    data = await fs.promises.readFile(`${uploads_path}${uuid_name}`, 'utf8');
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }

                        //console.log("PARSED TEXT", data);
                        console.log("EXTENSION", extension);

                        res.status(200).json({ status: 'OK', message: 'Datoteka parsirana', result: data });
                    });

                }
            }
        });
});

fileRouter.post('/', upload.single('file'), async (req, res) => {
    //create new file

    const user_id = req.session.userInfo?.user_id;

    console.log(req.file, req.body)

    const {
        filename
    } = req.file

    const uuid_name = filename;

    const {
        file_type_id,
        name,
        public
    } = req.body;


    database.db.query(
        `INSERT
        INTO files (  
        user_id, 
        file_type_id, 
        uuid_name,
        name, 
        public
        )
        VALUES (?,?,?,?,?)`,
        [
            user_id,
            file_type_id,
            uuid_name,
            name,
            public
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                res.status(200).json({ status: 'OK', message: 'Datoteka kreirana', result: result });
            }
        });
});

fileRouter.put('/:file_id', (req, res) => {
    //update file with file_id

    const {
        name,
        public,
        users
    } = req.body;

    database.db.query(
        `UPDATE
        files SET
        name = ?, 
        public = ?
        WHERE file_id = ?`,
        [
            name,
            public,
            req.params.file_id
        ],
        (error, result) => {
            if (error) {
                handleSQLError(res, error);
            }
            else {
                database.db_parallel.query(
                    `DELETE
                    FROM file_users
                    WHERE file_id = ?;

                    ${users?.length > 0 ?
                        `INSERT IGNORE
                        INTO file_users
                        (
                        file_id,
                        user_id
                        ) VALUES ?`
                        : ''
                    }`,
                    [
                        req.params.file_id,
                        users.map((user) => [
                            req.params.file_id,
                            user.user_id
                        ])
                    ],
                    (error, result) => {
                        if (error) {
                            handleSQLError(res, error);
                        }
                        else {
                            res.status(200).json({ status: 'OK', message: 'Datoteka ažurirana', result: result });
                        }
                    });
            }
        });
});

module.exports = fileRouter;