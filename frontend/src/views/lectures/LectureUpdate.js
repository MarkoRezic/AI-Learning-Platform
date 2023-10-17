import { card_update } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "../../utils/use_debounce";
import card_types from "../../constants/card_types";
import { prefixRoute } from "../../utils/prefix_route";

function CardUpdate() {
    const navigate = useNavigate();
    const { card_id } = useParams();
    const [card, setCard] = useState(null);
    const [name, setName] = useState(null);
    const [is_public, setPublic] = useState(null);
    const [users, setUsers] = useState(null);
    const [loadingCard, setLoadingCard] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        axios.get(`cards/${card_id}`).then((response) => {
            console.log(response.data);
            let card = response.data?.result;
            setCard(card);
            setName(card?.name);
            setPublic(card?.public);
            setLoadingCard(false);
        }).catch((error) => {
            console.log(error);
            setLoadingCard(false);
        });

        updateSearch('');
    }, []);

    const saveCard = () => {
        axios.put(`cards/${card_id}`, {
            name,
            public: is_public,
            users: card?.users,
        }).then((response) => {
            console.log(response.data);
            navigate(`${prefixRoute()}/card/${card_id}`);
        }).catch((error) => {
            console.log(error);
        });
    }


    const updateSearch = (search) => {
        setLoadingUsers(true)
        debouncedSearchUsers(search,
            (response) => {
                setLoadingUsers(false)
                setUsers(response.data?.result)
            }, (error) => {
                setLoadingUsers(false)
            })
    }

    const searchUsers = (search, callback, errorCallback) => {
        axios.post(`users/search`, {
            search
        }).then((response) => {
            console.log(response);
            callback(response);
        }).catch((error) => {
            console.log(error);
            errorCallback(error);
        })
    }

    const debouncedSearchUsers = useDebounce(searchUsers, 700)

    const addUserToCard = (user) => {
        if (!card?.users?.includes(user)) {
            setCard({
                ...card,
                users: [...card?.users, user],
            })
        }
    }

    const removeUserFromCard = (user) => {
        const card_users = [...card?.users].filter(card_user => card_user.user_id !== user.user_id)
        setCard({
            ...card,
            users: [...card_users],
        })
    }

    return (
        <div id="card-update">
            <div className="card-input-card input-card">
                {
                    loadingCard ?
                        <Loader />
                        : <>
                            <div className="input-card-row">
                                <label>Tip kartice</label>
                                <input className="card-card-type" type="text" value={
                                    Object.entries(card_types)
                                        .filter(([card_type_key, card_type], card_type_index) =>
                                            card_type.card_type_id === card?.card_type_id)?.[0]?.[1]?.text
                                } onChange={(e) => { setName(e.target.value) }} readOnly={true} />
                            </div>
                            <div className="input-card-row">
                                <label>Naziv kartice</label>
                                <input className="card-card-name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="input-card-row">
                                <label>{card?.card_type_id === card_types.question.card_type_id ? "Odgovor" : "Sažeti tekst"}</label>
                                <textarea id="answer-textarea" className="card-text" rows={10} spellCheck={false} value={card?.text} readOnly={true} />
                            </div>
                            {
                                card?.card_type_id === card_types.question.card_type_id ?
                                    <div className="input-card-row">
                                        <label>Pitanje</label>
                                        <textarea id="question-textarea" className="card-question" rows={6} value={card?.question} />
                                    </div>
                                    : null
                            }
                            <div className="input-card-row">
                                <label>Javno</label>
                                <input className="card-approved" type="checkbox" checked={is_public === 1} onChange={(e) => { setPublic(e.target.checked === true ? 1 : 0) }} />
                            </div>
                            <button className="input-card-submit" onClick={saveCard}>Spremi</button>
                        </>
                }
            </div>
            <div className="card-users-update">
                <div className="card-users">
                    {
                        loadingCard ?
                            <Loader />
                            : card?.users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}>
                                    <div className="user-full-name">{user?.firstname} {user?.lastname}</div>
                                    <div className="user-iss-username">{user?.iss_username}</div>
                                    <div className="user-edu-uid">{user?.edu_uid}</div>
                                    <div className="user-email">{user?.email}</div>
                                    <div className="user-github">{user?.github_profile_link}</div>
                                    <button className="user-remove" onClick={() => { removeUserFromCard(user) }}>Ukloni</button>
                                </div>
                            )
                    }
                </div>
                <div className="card-users-search">
                    <p>Dopusti pristup korisnicima:</p>
                    <input type="text" className="card-users-search-input" onChange={(e) => { updateSearch(e.target.value) }} />
                    {
                        loadingUsers ?
                            <Loader />
                            : users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}
                                    onClick={() => { addUserToCard(user) }}>
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
        </div>
    );
}

export default CardUpdate;
