import { user_list } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { prefixRoute } from "../../utils/prefix_route";

function UserList() {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`users`).then((response) => {
            console.log(response.data);
            setUserList(response.data?.result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`${prefixRoute()}/user/${user?.user_id}`);
    }

    return (
        <div id="user-list">
            <h1>Svi korisnici</h1>
            {
                loading ?
                    <Loader />
                    : <table className="user-table shadow-small border-large  ">
                        <tbody>
                            <tr>
                                <th>Slika</th>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Broj indeksa</th>
                                <th>EduID</th>
                                <th>Email</th>
                                <th>Github</th>
                            </tr>
                            {
                                userList.map((user, user_index) =>
                                    <tr className="user-row" key={user_index} onClick={() => { openUserDetails(user) }}>
                                        <td className="user-avatar shadow-inset-small border-small  "><div className="shadow-inset-mid rounded-mid  "><img src={user?.avatar_url}></img></div></td>
                                        <td className="user-firstname shadow-inset-small border-small  ">{user?.firstname}</td>
                                        <td className="user-lastname shadow-inset-small border-small  ">{user?.lastname}</td>
                                        <td className="user-iss-username shadow-inset-small border-small  ">{user?.iss_username}</td>
                                        <td className="user-edu-uid shadow-inset-small border-small  ">{user?.edu_uid}</td>
                                        <td className="user-email shadow-inset-small border-small  ">{user?.email}</td>
                                        <td className="user-github shadow-inset-small border-small  ">{user?.github_profile_link}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default UserList;
