import { card_new, card_update } from "../../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import axiosSummarize from "../../../axiosSummarize";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import card_types from "../../../constants/card_types";
import Select from 'react-select';
import { updateTextInputSize } from "../../../utils/autosize_text_input";

function CardNew() {
    const navigate = useNavigate();
    const [card_type_id, setCardTypeId] = useState(null);
    const [name, setName] = useState(null);
    const [text, setText] = useState(null);
    const [question, setQuestion] = useState(null);
    const [is_public, setPublic] = useState(0);
    const [users, setUsers] = useState([]);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summarized_text, setSummarizedText] = useState(null);

    const saveCard = () => {
        axios.post(`cards`, {
            card_type_id,
            name,
            text: summarized_text ?? text,
            question,
            public: is_public,
        }).then((response) => {
            console.log(response.data);
            navigate(`/admin/card/${response.data?.result?.insertId}`);
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
            text: text,
        }).then((response) => {
            console.log(response.data);
            setSummarizedText(response.data?.summarized_text)
            setLoadingSummary(false);
        }).catch((error) => {
            console.log(error);
            setLoadingSummary(false);
        });
    }

    return (
        <div id="card-update">
            <div className="card-input-card input-card">
                <div className="input-card-row">
                    <label>Tip kartice</label>
                    <Select
                        isSearchable={false}
                        isClearable={false}
                        isMulti={false}
                        value={card_type_id}
                        placeholder={"Odaberi Tip"}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        onChange={(option) => { setCardTypeId(option.value) }}
                        options={Object.entries(card_types).map(([card_type_key, card_type], card_type_index) => {
                            return {
                                value: card_type.card_type_id,
                                label: card_type.text
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
                    <textarea className="card-text" onInput={updateTextInputSize} value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Sažeti tekst</label>
                    <textarea className="card-text" onInput={updateTextInputSize} onChange={updateTextInputSize} value={summarized_text} readOnly={true} />
                </div>
                {
                    card_type_id === card_types.question.card_type_id ?
                        <div className="input-card-row">
                            <label>Pitanje</label>
                            <textarea className="card-question" value={question} onChange={(e) => { setQuestion(e.target.value) }} />
                        </div>
                        : null
                }
                <div className="input-card-row">
                    <label>Javno</label>
                    <input className="card-public" type="checkbox" checked={is_public === 1} onChange={(e) => { setPublic(e.target.checked === true ? 1 : 0) }} />
                </div>
                <button className="input-card-submit" onClick={summarizeText}>{loadingSummary ? <Loader /> : "Sažmi tekst"}</button>
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
