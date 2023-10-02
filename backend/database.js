require('dotenv').config();
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    ORIGIN_FRONTEND,
    SESSION_SECRET,
    ENVIRONMENT
} = process.env;

const mysql = require("mysql2");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStoreOptions = {
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 1 * 10 * 1000,
    // The maximum age of a valid session; milliseconds:
    expiration: 60 * 60 * 1000,
};
const sessionStore = new MySQLStore(sessionStoreOptions);

const sessionOptions = {
    key: 'session_id',
    secret: SESSION_SECRET,
    store: sessionStore,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: false,
        sameSite: 'lax',
        httpOnly: false,
        path: null,
    }
}

const db = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: 'utf8mb4',
});

const db_parallel = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: 'utf8mb4',
    multipleStatements: true,
});

module.exports = {
    mysql,
    session,
    MySQLStore,
    sessionStoreOptions,
    sessionStore,
    sessionOptions,
    db,
    db_parallel
};