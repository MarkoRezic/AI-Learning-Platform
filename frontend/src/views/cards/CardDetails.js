import { card_details } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import card_types from "../../constants/card_types";
import { prefixRoute } from "../../utils/prefix_route";

function CardDetails() {
    const navigate = useNavigate();
    const { card_id } = useParams();
    const [card, setCard] = useState(null);
    const [loadingCard, setLoadingCard] = useState(true);

    useEffect(() => {
        axios.get(`cards/${card_id}`).then((response) => {
            console.log(response.data);
            setCard(response.data?.result);
            setLoadingCard(false);
        }).catch((error) => {
            console.log(error);
            setLoadingCard(false);
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`${prefixRoute()}/user/${user?.user_id}`);
    }

    const updateCard = () => {
        navigate(`${prefixRoute()}/update-card/${card_id}`);
    }

    return (
        <div id="card-details">
            <h1>Detalji kartice</h1>
            <div className="card-card shadow-large dip-mid rounded-large  ">
                {
                    loadingCard ?
                        <Loader />
                        : <>
                            <div className="card-card-info">
                                {
                                    card?.lecture_id != null || card?.file_id ?
                                        <div className="generate-card-header">
                                            <div className="generate-card">
                                                Generirano iz{card?.lecture_id != null ? " lekcije: " : card?.file_id != null ? " datoteke: " : ": "}
                                                <Link className="generate-card-link" to={`${prefixRoute()}/${card?.lecture_id != null ? "lecture/" : card?.file_id != null ? "file/" : ""}${card?.lecture_id ?? card?.file_id ?? ""}`}>
                                                    {card?.lecture_name ?? card?.file_name ?? ""}
                                                </Link>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="card-creator shadow-inset-small rounded-mid" onClick={(e) => {
                                    openUserDetails({
                                        user_id: card?.creator_id
                                    })
                                }}><img src={card?.creator_avatar_url} />{card?.creator_firstname} {card?.creator_lastname}</div>
                                <div className="card-name shadow-inset-small rounded-mid">{card?.name}</div>
                                <div className="card-type shadow-inset-small rounded-mid">{card?.card_type_text}</div>
                                {
                                    card?.card_type_id === card_types.question.card_type_id ?
                                        <div className="card-question shadow-inset-small rounded-mid">{card?.question}</div>
                                        : null
                                }
                                <div className="card-text shadow-inset-small rounded-mid">{card?.text}</div>
                                <div className="card-public shadow-inset-small rounded-mid">{card?.public === 1 ? "JAVNO" : "PRIVATNO"}</div>
                            </div>
                            <div className="card-card-actions details-actions">
                                <button className="" onClick={updateCard}>Uredi</button>
                            </div>
                        </>
                }
            </div>
            <div className="card-users">
                {
                    loadingCard ?
                        <Loader />
                        : card?.users?.map((user, user_index) =>
                            <div className="user-row list-item"
                                key={user_index}
                                onClick={() => { openUserDetails(user) }}>
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

export default CardDetails;
