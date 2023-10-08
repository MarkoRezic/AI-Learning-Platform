import { team_update } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

function TeamNew() {
    const navigate = useNavigate();
    const [team_name, setTeamName] = useState(null);
    const [project_name, setProjectName] = useState(null);
    const [project_github_link, setProjectGithubLink] = useState(null);
    const [academic_year, setAcademicYear] = useState(new Date().getFullYear());
    const [approved, setApproved] = useState(0);
    const [users, setUsers] = useState([]);

    const saveTeam = () => {
        axios.post(`teams`, {
            team_name,
            project_name,
            project_github_link,
            academic_year,
            approved,
        }).then((response) => {
            console.log(response.data);
            navigate(`/team/${response.data?.result?.insertId}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id="team-update">
            <div className="team-input-card input-card">
                <div className="input-card-row">
                    <label>Naziv tima</label>
                    <input className="team-team-name" type="text" value={team_name} onChange={(e) => { setTeamName(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Naziv projekta</label>
                    <input className="team-project-name" type="text" value={project_name} onChange={(e) => { setProjectName(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Github projekta</label>
                    <input className="team-project-github-link" type="text" value={project_github_link} onChange={(e) => { setProjectGithubLink(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Akademska godina</label>
                    <input className="team-academic-year" type="number" min={2000} max={new Date().getFullYear()} value={academic_year} onChange={(e) => { setAcademicYear(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <label>Odobreno</label>
                    <input className="team-approved" type="checkbox" checked={approved === 1} onChange={(e) => { setApproved(e.target.checked === true ? 1 : 0) }} />
                </div>
                <button className="input-card-submit" onClick={saveTeam}>Spremi</button>
            </div>
            <div className="team-users">
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

export default TeamNew;
