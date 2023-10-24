import { team_list } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context";
import { prefixRoute } from "../../utils/prefix_route";

function TeamList({ user, ...rest }) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [teamList, setTeamList] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(user);

    useEffect(() => {
        axios.get(`teams${user === true ? `/user/${context?.user?.user_id}` : ''}`).then((response) => {
            console.log(response.data);
            setTeamList(response.data?.result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [user]);

    const openTeamDetails = (team) => {
        navigate(`${prefixRoute()}/team/${team?.team_id}`);
    }

    return (
        <div id="team-list">
            <h1>{user === true ? "Moji" : "Svi"} projekti</h1>
            {
                loading ?
                    <Loader />
                    : <table className="team-table shadow-small border-large  ">
                        <tbody>
                            <tr>
                                <th>Naziv tima</th>
                                <th>Naziv projekta</th>
                                <th>Github projekta</th>
                                <th>Akademska godina</th>
                                <th>Status</th>
                                <th>Broj članova</th>
                            </tr>
                            {
                                teamList.map((team, team_index) =>
                                    <tr className="team-row" key={team_index} onClick={() => { openTeamDetails(team) }}>
                                        <td className="team-team-name shadow-inset-small  ">{team?.team_name}</td>
                                        <td className="team-project-name shadow-inset-small  ">{team?.project_name}</td>
                                        <td className="team-project-github-link shadow-inset-small  ">{team?.project_github_link}</td>
                                        <td className="team-academic-year shadow-inset-small  ">{team?.academic_year}</td>
                                        <td className="team-approved shadow-inset-small  ">{team?.approved === 1 ? "ODOBRENO" : "NA ČEKANJU"}</td>
                                        <td className="team-user-count shadow-inset-small  ">{team?.user_count}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default TeamList;
