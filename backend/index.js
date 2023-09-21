require('dotenv').config();
const {
    ORIGIN_FRONTEND
} = process.env;

const express = require('express');
const authRouter = require('./routers/authRouter.js');
const projectRouter = require('./routers/projectRouter.js');
const userRouter = require('./routers/userRouter.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./database.js');
const port = process.env.PORT || 3001

const app = express();

app.use(cors({
    origin: [ORIGIN_FRONTEND],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.json({ message: 'AI Learning Platform API' });
})

app.use(database.session(database.sessionOptions));

app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

