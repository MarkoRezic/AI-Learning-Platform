require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { encoding_for_model } = require("@dqbd/tiktoken");
const card_types = require('../frontend/src/constants/card_types');
const summary_sections = require('../frontend/src/constants/summary_sections');
const mode_types = require('../frontend/src/constants/mode_types');
const count_types = require('../frontend/src/constants/count_types');
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

app.post('/summarize', async (req, res) => {
    let { text, card_type, mode, count } = req.body;
    console.log("SUMMARIZATION INPUT:", req.body);

    if (mode == null) {
        mode = mode_types.extractive.name;
    }
    if (count == null) {
        count = count_types.auto.name;
    }

    let prompt = '';

    switch (card_type?.card_type_id) {
        case card_types.definition.card_type_id:
            prompt = `
                Sažmi sljedeći tekst ${mode === mode_types.extractive.name ? 'ekstraktivnim' : 'apstraktivnim'} sažimanjem${count === count_types.auto.name ? '' : ` u ${count} rečenica`}: 
                "${text}" 
                Započni sekciju sažetog teksta sa ${summary_sections.answer.start}. Završi sekciju sažetog teksta sa ${summary_sections.answer.end}
            `;
            break;
        case card_types.question.card_type_id:
            prompt = `
                ${([mode_types.abstractive.name, mode_types.extractive.name].includes(mode)) ? `Sažmi sljedeći tekst ${mode === mode_types.extractive.name ? 'ekstraktivnim' : 'apstraktivnim'} sažimanjem${count === count_types.auto.name ? '' : ` u ${count} rečenica`}`
                    : ([mode_types.single_choice.name, mode_types.multiple_choice.name].includes(mode)) ? `Generiraj jedno pitanje i ${count === count_types.auto.name ? 'nekoliko' : count} izbora za odgovor za sljedeći tekst`
                        : ''
                }: 
                "${text}" 
                ${([mode_types.abstractive.name, mode_types.extractive.name].includes(mode)) ? `Započni sekciju sažetog teksta sa ${summary_sections.answer.start}. Završi sekciju sažetog teksta sa ${summary_sections.answer.end}. Ispod sekcije sažetog teksta, generiraj sekciju za pitanje na koju odgovara sekcija sažetog teksta. Započni sekciju za pitanje sa ${summary_sections.question.start}. Završi sekciju za pitanje sa ${summary_sections.question.end}. Sekcija za pitanje treba sadržavati samo jedno pitanje.`
                    : ([mode_types.single_choice.name, mode_types.multiple_choice.name].includes(mode)) ? `Započni sekciju za pitanje i za izbore odgovora sa ${summary_sections.question.start}. Završi sekciju za pitanje i za izbore odgovora sa ${summary_sections.question.end}. Izbore za odgovore redom započni sa malim slovom abecede popraćenim sa zagradom. Može biti ${mode === mode_types.single_choice.name ? 'samo jedan točan izbor' : 'više od jednog točnih izbora'} od mogućih odgovora. Ostali izbori neka budu netočne informacije. Ispod sekcije za pitanje i izbore generiraj sekciju za ${mode === mode_types.single_choice.name ? 'točni odgovor' : 'točne odgovore'}, i navedi samo slovo ${mode === mode_types.single_choice.name ? 'tog odgovora popraćenog' : 'tih odgovora popraćenih'} zagradom u toj sekciji. Započni sekciju za ${mode === mode_types.single_choice.name ? 'točni odgovor' : 'točne odgovore'} sa ${summary_sections.answer.start}. Završi sekciju za ${mode === mode_types.single_choice.name ? 'točni odgovor' : 'točne odgovore'} sa ${summary_sections.answer.end}.`
                        : ''
                }
            `;
            break;
        case card_types.info.card_type_id:
            prompt = `
                ${([mode_types.abstractive.name, mode_types.extractive.name].includes(mode)) ? `Sažmi sljedeći tekst ${mode === mode_types.extractive.name ? 'ekstraktivnim' : 'apstraktivnim'} sažimanjem${count === count_types.auto.name ? '' : ` u ${count} rečenica`}`
                    : mode === mode_types.simple.name ? `Sažmi sljedeći tekst i maksimalno pojednostavni`
                        : mode === mode_types.keywords.name ? `Izvuci samo najbitnije ključne riječi iz sljedećeg teksta`
                            : ''
                }: 
                "${text}" 
                ${([mode_types.abstractive.name, mode_types.extractive.name, mode_types.simple.name].includes(mode)) ? `Započni sekciju sažetog teksta sa ${summary_sections.answer.start}. Završi sekciju sažetog teksta sa ${summary_sections.answer.end}`
                    : mode === mode_types.keywords.name ? `Započni sekciju ključnih riječi sa ${summary_sections.answer.start}. Završi sekciju ključnih riječi sa ${summary_sections.answer.end}. Ključne riječi razdvoji zarezom popraćenim sa razmakom. Ključnih riječi neka ne bude preko 20.`
                        : ''
                }
            `;
            break;
        default:

    }

    console.log("PROMPT", prompt);

    var summary_response;

    //Check number of tokens, if over 3.8K, return failure
    const encoder = encoding_for_model("gpt-3.5-turbo");

    const tokens = encoder.encode(prompt);
    encoder.free();
    console.log("TOKEN COUNT:", tokens.length);

    if (tokens.length >= 3800) {
        res.json({
            message: 'Summarization failed', content: {
                answer: "Molimo smanjite dužinu teksta.",
                question: "",
            }
        });
    }
    else {
        // write the prompt to file and later read in python, this is to ensure large prompts are loaded correctly
        let filename = `prompt_${uuidv4()}.txt`;
        await fs.promises.writeFile(`./prompt/${filename}`, prompt, { encoding: "utf-8" });

        // spawn new child process to call the python script
        const python = spawn('python', ['./scripts/summarize.py', filename, '']);

        // collect data from script
        python.stdout.on('data', function (data) {
            console.log('Raw output response:', data.toString());
            summary_response = JSON.parse(data.toString().replace("<pad>", "").replace("</s>", ""));
            console.log('Pipe data from python script:', summary_response);
        });

        // collect error data from script
        python.stderr.on('data', function (data) {
            console.log('PYTHON ERROR:', data.toString());
        });

        // in close event we are sure that stream from child process is closed
        python.on('close', async (code) => {
            console.log(`child process close all stdio with code ${code}`);

            let content = {
                answer: "",
                question: ""
            }

            let response_content = summary_response?.choices?.[0]?.message?.content;

            let indexAnswerStart = response_content.indexOf(summary_sections.answer.start) + summary_sections.answer.start.length;
            let indexAnswerEnd = response_content.indexOf(summary_sections.answer.end);
            if (indexAnswerEnd === -1) {
                indexAnswerEnd = response_content.indexOf(summary_sections.question.start)
            }
            content.answer = response_content.substring(indexAnswerStart, indexAnswerEnd).replace(/^(: |:| )/, "").trim();

            if (card_type?.card_type_id === card_types.question.card_type_id) {
                let indexQuestionStart = response_content.indexOf(summary_sections.question.start) + summary_sections.question.start.length;
                let indexQuestionEnd = response_content.indexOf(summary_sections.question.end);
                content.question = response_content.substring(indexQuestionStart, indexQuestionEnd).replace(/^(: |:| )/, "").trim();
            }

            // delete prompt file
            await fs.promises.unlink(`./prompt/${filename}`);

            // send data to browser
            res.json({ message: 'Summarization success', content });
        });
    }

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

