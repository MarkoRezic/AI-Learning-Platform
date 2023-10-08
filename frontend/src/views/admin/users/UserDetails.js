//import "../../styles/UserDetails.scss";
import { user_details } from "../../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTeams, setLoadingTeams] = useState(true);

    useEffect(() => {
        axios.get(`users/${user_id}`).then((response) => {
            console.log(response.data);
            setUser(response.data?.result);
            setLoadingUser(false);
        }).catch((error) => {
            console.log(error);
            setLoadingUser(false);
        });

        axios.get(`teams/user/${user_id}`).then((response) => {
            console.log(response.data);
            setTeams(response.data?.result);
            setLoadingTeams(false);
        }).catch((error) => {
            console.log(error);
            setLoadingTeams(false);
        });
    }, []);

    const openTeamDetails = (team) => {
        navigate(`/admin/team/${team?.team_id}`);
    }

    return (
        <div id="user-details">
            <div className="user-card shadow-large dip-mid rounded-large  ">
                {
                    loadingUser ?
                        <Loader />
                        : <>
                            <img className="shadow-inset-mid rounded-large  " src={user?.avatar_url}></img>
                            <div className="user-card-info">
                                <div className="user-full-name shadow-inset-small rounded-mid  ">{user?.firstname} {user?.lastname}</div>
                                <div className="user-iss-username shadow-inset-small rounded-mid  ">{user?.iss_username}</div>
                                <div className="user-edu-uid shadow-inset-small rounded-mid  ">{user?.edu_uid}</div>
                                <div className="user-email shadow-inset-small rounded-mid  ">{user?.email}</div>
                                <div className="user-github shadow-inset-small rounded-mid  ">{user?.github_profile_link}</div>
                            </div>
                        </>
                }
            </div>
            <div className="user-teams">
                {
                    loadingTeams ?
                        <Loader />
                        : teams.map((team, team_index) =>
                            <div className="team-row list-item"
                                key={team_index}
                                onClick={() => { openTeamDetails(team) }}>
                                <div className="team-team-name">{team?.team_name}</div>
                                <div className="team-project-name">{team?.project_name}</div>
                                <div className="team-project-github-link">{team?.project_github_link}</div>
                                <div className="team-academic-year">{team?.academic_year}</div>
                                <div className="team-approved">{team?.approved === 1 ? "ODOBRENO" : "NA ČEKANJU"}</div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default UserDetails;
