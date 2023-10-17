import { team_details } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { prefixRoute } from "../../utils/prefix_route";
import { DataContext } from "../../Context";
import roles from "../../constants/roles";
import OPEN_LINK from "../../images/open_link.svg";
import { openInNewTab } from "../../utils/open_in_new_tab";

function TeamDetails() {
    const context = useContext(DataContext);
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
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`${prefixRoute()}/user/${user?.user_id}`);
    }

    const updateTeam = () => {
        navigate(`${prefixRoute()}/update-team/${team_id}`);
    }

    const openGithubLink = (e) => {
        openInNewTab(team?.project_github_link);
    }

    return (
        <div id="team-details">
            <h1>Detalji projekta</h1>
            <div className="team-card shadow-large dip-mid rounded-large  ">
                {
                    loadingTeam ?
                        <Loader />
                        : <>
                            <div className="team-card-info">
                                <div className="team-team-name shadow-inset-small rounded-mid">{team?.team_name}</div>
                                <div className="team-project-name shadow-inset-small rounded-mid">{team?.project_name}</div>
                                <div className="team-project-github-link shadow-inset-small rounded-mid">{team?.project_github_link} {
                                    team?.project_github_link != null ?
                                        <img src={OPEN_LINK} onClick={openGithubLink} />
                                        : null
                                }</div>
                                <div className="team-academic-year shadow-inset-small rounded-mid">{team?.academic_year}</div>
                                <div className="team-approved shadow-inset-small rounded-mid">{team?.approved === 1 ? "ODOBRENO" : "NA ČEKANJU"}</div>
                            </div>
                            {
                                context?.user?.role_id === roles.admin.role_id ?
                                    <div className="team-card-actions details-actions">
                                        <button className="" onClick={updateTeam}>Uredi</button>
                                    </div>
                                    : null
                            }
                        </>
                }
            </div>
            <h2>Članovi tima</h2>
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
