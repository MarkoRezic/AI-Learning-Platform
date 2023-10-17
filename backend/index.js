require('dotenv').config();
const {
    ORIGIN_FRONTEND,
    ORIGIN_FRONTEND_IP,
    ORIGIN_BACKEND,
} = process.env;

const express = require('express');
const authRouter = require('./routers/authRouter.js');
const teamRouter = require('./routers/teamRouter.js');
const userRouter = require('./routers/userRouter.js');
const cardRouter = require('./routers/cardRouter.js');
const lectureRouter = require('./routers/lectureRouter.js');
const technologyRouter = require('./routers/technologyRouter.js');
const fileRouter = require('./routers/fileRouter.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./database.js');
const port = process.env.PORT || 8000
const axios = require("axios");
const { eduid_client } = require('./eduid_client.js');

axios.defaults.withCredentials = true;

const app = express();



app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
}));
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.json({ message: 'AI Learning Platform API' });
})

app.use(database.session(database.sessionOptions));

// Callback service parsing the authorization token and asking for the access token
app.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;
    const options = {
        code,
    };

    try {
        const eduid_response = await eduid_client.getToken(options);

        console.log('The resulting token: ', eduid_response.token);

        res.status(200).redirect(`${ORIGIN_FRONTEND}/login?eduid_token=${eduid_response.token.access_token}`);
    } catch (error) {
        console.log('Access Token Error', error);
        return res.status(401).json({ status: 'Unauthorized', message: 'eduID authentication failed' });
    }
});

app.use('/auth', authRouter);
app.use('/teams', teamRouter);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/lectures', lectureRouter);
app.use('/technologies', technologyRouter);
app.use('/files', fileRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

