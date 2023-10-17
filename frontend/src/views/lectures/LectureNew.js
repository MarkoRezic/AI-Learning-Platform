import { card_new, card_update } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import axiosSummarize from "../../axiosSummarize";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { updateTextInputSizeEvent, updateTextInputSizeTarget } from "../../utils/autosize_text_input";
import card_types from "../../constants/card_types";
import mode_types from "../../constants/mode_types";
import count_types from "../../constants/count_types";
import { prefixRoute } from "../../utils/prefix_route";

function CardNew() {
    const navigate = useNavigate();
    const [card_type, setCardType] = useState({
        value: card_types.definition.card_type_id,
        label: card_types.definition.text,
        card_type_id: card_types.definition.card_type_id,
    });
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [question, setQuestion] = useState('');
    const [mode_type, setModeType] = useState({
        value: mode_types.extractive.name,
        label: mode_types.extractive.text,
        ...mode_types.extractive
    });
    const [count_type, setCountType] = useState({
        value: count_types["3-5"].name,
        label: count_types["3-5"].text,
        ...count_types["3-5"]
    });
    const [is_public, setPublic] = useState(0);
    const [users, setUsers] = useState([]);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summarized_text, setSummarizedText] = useState('');

    const saveCard = () => {
        axios.post(`cards`, {
            card_type_id: card_type.card_type_id,
            name,
            text: summarized_text ?? text,
            question,
            public: is_public,
        }).then((response) => {
            console.log(response.data);
            navigate(`${prefixRoute()}/card/${response.data?.result?.insertId}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    const summarizeText = () => {
        if (loadingSummary) {
            return;
        }
        setLoadingSummary(true);
        axiosSummarize.post(`summarize`, {
            text,
            card_type,
            mode: mode_type?.name,
            count: count_type?.name,
        }).then((response) => {
            console.log(response.data);
            setSummarizedText(response.data?.content?.answer);
            setQuestion(response.data?.content?.question);
            setLoadingSummary(false);
        }).catch((error) => {
            console.log(error);
            setLoadingSummary(false);
        });
    }

    useEffect(() => {
        setModeType(null)
    }, [card_type, setCardType]);

    useEffect(() => {
        setCountType(null)
    }, [mode_type, setModeType]);

    return (
        <div id="card-update">
            <div className="card-input-card input-card">
                <div className="input-card-row">
                    <label>Tip kartice</label>
                    <Select
                        isSearchable={false}
                        isClearable={false}
                        isMulti={false}
                        value={card_type ?? ''}
                        placeholder={"Odaberi Tip"}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        onChange={(option) => { setCardType(option) }}
                        options={Object.entries(card_types).map(([card_type_key, card_type], card_type_index) => {
                            return {
                                value: card_type.card_type_id,
                                label: card_type.text,
                                card_type_id: card_type.card_type_id,
                            }
                        }
                        )}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="input-card-row">
                    <label>Naziv kartice</label>
                    <input className="card-name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Tekst</label>
                    <textarea className="card-text" rows={10} spellCheck={false} onInput={updateTextInputSizeEvent} value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>{card_type?.card_type_id === card_types.question.card_type_id ? "Odgovor" : "Sažeti tekst"}</label>
                    <textarea id="answer-textarea" className="card-text" rows={10} spellCheck={false} value={summarized_text} readOnly={true} />
                </div>
                {
                    card_type?.card_type_id === card_types.question.card_type_id ?
                        <div className="input-card-row">
                            <label>Pitanje</label>
                            <textarea id="question-textarea" className="card-question" rows={6} value={question} onChange={(e) => { setQuestion(e.target.value) }} />
                        </div>
                        : null
                }
                <div className="input-card-row">
                    <label>Tip {card_type?.card_type_id === card_types.question.card_type_id ? "pitanja i odgovora" : "sažimanja"}</label>
                    <Select
                        isSearchable={false}
                        isClearable={false}
                        isMulti={false}
                        value={mode_type ?? ''}
                        placeholder={"Odaberi Tip"}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        onChange={(option) => { setModeType(option) }}
                        options={Object.entries(mode_types)
                            .filter(([mode_type_key, mode_type], mode_type_index) =>
                                [
                                    mode_types.extractive.name,
                                    mode_types.abstractive.name,
                                    ...(
                                        card_type?.card_type_id === card_types.question.card_type_id ?
                                            [
                                                mode_types.single_choice.name,
                                                mode_types.multiple_choice.name,
                                            ]
                                            : card_type?.card_type_id === card_types.info.card_type_id ?
                                                [
                                                    mode_types.simple.name,
                                                    mode_types.keywords.name,
                                                ]
                                                : []
                                    )
                                ].includes(mode_type.name))
                            .map(([mode_type_key, mode_type], mode_type_index) => {
                                return {
                                    value: mode_type.name,
                                    label: mode_type.text,
                                    name: mode_type.name,
                                    text: mode_type.text,
                                }
                            }
                            )}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>
                {
                    [
                        ...(
                            card_type?.card_type_id === card_types.question.card_type_id ? [] : [
                                mode_types.abstractive.name,
                                mode_types.extractive.name,
                            ]
                        ),
                        mode_types.single_choice.name,
                        mode_types.multiple_choice.name
                    ].includes(mode_type?.name) ?
                        <div className="input-card-row">
                            <label>Broj {
                                card_type?.card_type_id === card_types.question.card_type_id ? "ponuđenih odgovora" : "rečenica"}</label>
                            <Select
                                isSearchable={false}
                                isClearable={false}
                                isMulti={false}
                                value={count_type ?? ''}
                                placeholder={"Odaberi Broj"}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={(option) => { setCountType(option) }}
                                options={Object.entries(count_types)
                                    .filter(([count_type_key, count_type], count_type_index) =>
                                        (card_type?.card_type_id === card_types.question.card_type_id
                                            && [mode_types.single_choice.name, mode_types.multiple_choice.name].includes(mode_type?.name)) ?
                                            [count_types.auto.name, count_types["2-3"].name, count_types["4-5"].name, count_types["6-8"].name].includes(count_type.name)
                                            : [count_types.auto.name, count_types["1-2"].name, count_types["3-5"].name, count_types["6-10"].name].includes(count_type.name)
                                    )
                                    .map(([count_type_key, count_type], count_type_index) => {
                                        return {
                                            value: count_type.name,
                                            label: count_type.text,
                                            name: count_type.name,
                                            text: count_type.text,
                                        }
                                    }
                                    )}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                        : null
                }
                <div className="input-card-row">
                    <label>Javno</label>
                    <input className="card-public" type="checkbox" checked={is_public === 1} onChange={(e) => { setPublic(e.target.checked === true ? 1 : 0) }} />
                </div>
                <button className="input-card-submit" onClick={summarizeText}>{loadingSummary ? <Loader /> : card_type?.card_type_id === card_types.question.card_type_id ? "Generiraj pitanje i odgovor" : "Sažmi tekst"}</button>
                <button className="input-card-submit" onClick={saveCard}>Spremi</button>
            </div>
            <div className="card-users">
                {
                    users?.map((user, user_index) =>
                        <div className="user-row list-item"
                            key={user_index}
                            onClick={() => { }}>
                            <div className="user-full-name">{user?.firstname} {user?.lastname}</div>
                            <div className="user-iss-username">{user?.iss_username}</div>
                            <div className="user-edu-uid">{user?.edu_uid}</div>
                            <div className="user-email">{user?.email}</div>
                            <div className="user-github">{user?.github_profile_link}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CardNew;
