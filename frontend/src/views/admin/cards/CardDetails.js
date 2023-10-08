import { card_details } from "../../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import card_types from "../../../constants/card_types";

function CardDetails() {
    const navigate = useNavigate();
    const { card_id } = useParams();
    const [card, setcard] = useState(null);
    const [loadingcard, setLoadingcard] = useState(true);

    useEffect(() => {
        axios.get(`cards/${card_id}`).then((response) => {
            console.log(response.data);
            setcard(response.data?.result);
            setLoadingcard(false);
        }).catch((error) => {
            console.log(error);
            setLoadingcard(false);
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`/admin/user/${user?.user_id}`);
    }

    const updatecard = () => {
        navigate(`/admin/update-card/${card_id}`);
    }

    return (
        <div id="card-details">
            <div className="card-card shadow-large dip-mid rounded-large  ">
                {
                    loadingcard ?
                        <Loader />
                        : <>
                            <div className="card-card-info">
                                <div className="card-name shadow-inset-small rounded-mid">{card?.name}</div>
                                <div className="card-type shadow-inset-small rounded-mid">{card?.card_type_text}</div>
                                <div className="card-text shadow-inset-small rounded-mid">{card?.text}</div>
                                {
                                    card?.card_type_id === card_types.question.card_type_id ?
                                        <div className="card-question shadow-inset-small rounded-mid">{card?.question}</div>
                                        : null
                                }
                                <div className="card-public shadow-inset-small rounded-mid">{card?.public === 1 ? "JAVNO" : "PRIVATNO"}</div>
                            </div>
                            <div className="card-card-actions details-actions">
                                <button className="" onClick={updatecard}>Uredi</button>
                            </div>
                        </>
                }
            </div>
            <div className="card-users">
                {
                    loadingcard ?
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
