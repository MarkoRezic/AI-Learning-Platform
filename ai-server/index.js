require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const port = process.env.PORT || 8001

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.json({ message: 'AI Summarziation API' });
})

app.post('/summarize', (req, res) => {
    const { text } = req.body
    console.log("ORIGINAL TEXT:", text);

    var summarized_text;
    // spawn new child process to call the python script
    const python = spawn('python', ['./scripts/summarize.py', text]);
    // collect data from script
    python.stdout.on('data', function (data) {
        summarized_text = data.toString().replace("<pad>", "").replace("</s>", "");
        console.log('Pipe data from python script:', summarized_text);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.json({ message: 'Summarization success', summarized_text });
    });

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

