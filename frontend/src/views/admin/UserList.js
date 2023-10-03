import "../../styles/UserList.css";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

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
        navigate(`/user/${user?.user_id}`);
    }

    return (
        <div id="user-list">
            {
                loading ?
                    <Loader />
                    : <table className="user-table">
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
                                        <td className="user-avatar"><img src={user?.avatar_url}></img></td>
                                        <td className="user-firstname">{user?.firstname}</td>
                                        <td className="user-lastname">{user?.lastname}</td>
                                        <td className="user-iss-username">{user?.iss_username}</td>
                                        <td className="user-edu-uid">{user?.edu_uid}</td>
                                        <td className="user-email">{user?.email}</td>
                                        <td className="user-github">{user?.github_profile_link}</td>
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
