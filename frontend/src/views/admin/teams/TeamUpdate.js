import { team_update } from "../../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "../../../utils/use_debounce";

function TeamUpdate() {
    const navigate = useNavigate();
    const { team_id } = useParams();
    const [team, setTeam] = useState(null);
    const [team_name, setTeamName] = useState(null);
    const [project_name, setProjectName] = useState(null);
    const [project_github_link, setProjectGithubLink] = useState(null);
    const [academic_year, setAcademicYear] = useState(null);
    const [approved, setApproved] = useState(null);
    const [users, setUsers] = useState(null);
    const [loadingTeam, setLoadingTeam] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        axios.get(`teams/${team_id}`).then((response) => {
            console.log(response.data);
            let team = response.data?.result;
            setTeam(team);
            setTeamName(team?.team_name);
            setProjectName(team?.project_name);
            setProjectGithubLink(team?.project_github_link);
            setAcademicYear(team?.academic_year);
            setApproved(team?.approved);
            setLoadingTeam(false);
        }).catch((error) => {
            console.log(error);
            setLoadingTeam(false);
        });

        updateSearch('');
    }, []);

    const saveTeam = () => {
        axios.put(`teams/${team_id}`, {
            team_name,
            project_name,
            project_github_link,
            academic_year,
            approved,
            users: team?.users,
        }).then((response) => {
            console.log(response.data);
            navigate(`/admin/team/${team_id}`);
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

    const addUserToTeam = (user) => {
        if (!team?.users?.includes(user)) {
            setTeam({
                ...team,
                users: [...team?.users, user],
            })
        }
    }

    const removeUserFromTeam = (user) => {
        const team_users = [...team?.users].filter(team_user => team_user.user_id !== user.user_id)
        setTeam({
            ...team,
            users: [...team_users],
        })
    }

    return (
        <div id="team-update">
            <div className="team-input-card input-card">
                {
                    loadingTeam ?
                        <Loader />
                        : <>
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
                        </>
                }
            </div>
            <div className="team-users-update">
                <div className="team-users">
                    {
                        loadingTeam ?
                            <Loader />
                            : team?.users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}>
                                    <div className="user-full-name">{user?.firstname} {user?.lastname}</div>
                                    <div className="user-iss-username">{user?.iss_username}</div>
                                    <div className="user-edu-uid">{user?.edu_uid}</div>
                                    <div className="user-email">{user?.email}</div>
                                    <div className="user-github">{user?.github_profile_link}</div>
                                    <button className="user-remove" onClick={() => { removeUserFromTeam(user) }}>Ukloni</button>
                                </div>
                            )
                    }
                </div>
                <div className="team-users-search">
                    <p>Dodaj članove u tim:</p>
                    <input type="text" className="team-users-search-input" onChange={(e) => { updateSearch(e.target.value) }} />
                    {
                        loadingUsers ?
                            <Loader />
                            : users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}
                                    onClick={() => { addUserToTeam(user) }}>
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

export default TeamUpdate;
