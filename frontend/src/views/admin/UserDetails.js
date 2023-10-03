import "../../styles/UserDetails.css";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
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

    return (
        <div id="user-details">
            <div className="user-card">
                {
                    loadingUser ?
                        <Loader />
                        : <>
                            <img src={user?.avatar_url}></img>
                            <div className="divider vertical"></div>
                            <div className="user-card-info">
                                <div className="user-full-name">{user?.firstname} {user?.lastname}</div>
                                <div className="user-iss-username">{user?.iss_username}</div>
                                <div className="user-edu-uid">{user?.edu_uid}</div>
                                <div className="user-email">{user?.email}</div>
                                <div className="user-github">{user?.github_profile_link}</div>
                            </div>
                        </>
                }
            </div>
            <div className="user-teams">
                {
                    loadingTeams ?
                        <Loader />
                        : teams.map((team, team_index) =>
                            <div className="team-row" key={team_index}>
                                <div className="team-team-name">{team?.team_name}</div>
                                <div className="team-project-name">{team?.project_name}</div>
                                <div className="team-project-github-link">{team?.project_github_link}</div>
                                <div className="team-academic-year">{team?.academic_year}</div>
                                <div className="team-approved">{team?.approved}</div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default UserDetails;
