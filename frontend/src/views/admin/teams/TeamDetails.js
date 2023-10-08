import { team_details } from "../../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

function TeamDetails() {
    const navigate = useNavigate();
    const { team_id } = useParams();
    const [team, setTeam] = useState(null);
    const [loadingTeam, setLoadingTeam] = useState(true);

    useEffect(() => {
        axios.get(`teams/${team_id}`).then((response) => {
            console.log(response.data);
            setTeam(response.data?.result);
            setLoadingTeam(false);
        }).catch((error) => {
            console.log(error);
            setLoadingTeam(false);
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`/admin/user/${user?.user_id}`);
    }

    const updateTeam = () => {
        navigate(`/admin/update-team/${team_id}`);
    }

    return (
        <div id="team-details">
            <div className="team-card shadow-large dip-mid rounded-large  ">
                {
                    loadingTeam ?
                        <Loader />
                        : <>
                            <div className="team-card-info">
                                <div className="team-team-name shadow-inset-small rounded-mid">{team?.team_name}</div>
                                <div className="team-project-name shadow-inset-small rounded-mid">{team?.project_name}</div>
                                <div className="team-project-github-link shadow-inset-small rounded-mid">{team?.project_github_link}</div>
                                <div className="team-academic-year shadow-inset-small rounded-mid">{team?.academic_year}</div>
                                <div className="team-approved shadow-inset-small rounded-mid">{team?.approved === 1 ? "ODOBRENO" : "NA ČEKANJU"}</div>
                            </div>
                            <div className="team-card-actions details-actions">
                                <button className="" onClick={updateTeam}>Uredi</button>
                            </div>
                        </>
                }
            </div>
            <div className="team-users">
                {
                    loadingTeam ?
                        <Loader />
                        : team?.users?.map((user, user_index) =>
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

export default TeamDetails;
