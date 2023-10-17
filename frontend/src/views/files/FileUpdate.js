import { file_update } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "../../utils/use_debounce";
import file_types from "../../constants/file_types";
import { prefixRoute } from "../../utils/prefix_route";

function FileUpdate() {
    const navigate = useNavigate();
    const { file_id } = useParams();
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [is_public, setPublic] = useState(null);
    const [users, setUsers] = useState(null);
    const [loadingFile, setLoadingFile] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        axios.get(`files/${file_id}`).then((response) => {
            console.log(response.data);
            let file = response.data?.result;
            setFile(file);
            setName(file?.name);
            setPublic(file?.public);
            setLoadingFile(false);
        }).catch((error) => {
            console.log(error);
            setLoadingFile(false);
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
        });

        updateSearch('');
    }, []);

    const saveFile = () => {
        axios.put(`files/${file_id}`, {
            name,
            public: is_public,
            users: file?.users,
        }).then((response) => {
            console.log(response.data);
            navigate(`${prefixRoute()}/file/${file_id}`);
        }).catch((error) => {
            console.log(error);
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
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

    const addUserToFile = (user) => {
        if (!file?.users?.includes(user)) {
            setFile({
                ...file,
                users: [...file?.users, user],
            })
        }
    }

    const removeUserFromFile = (user) => {
        const file_users = [...file?.users].filter(file_user => file_user.user_id !== user.user_id)
        setFile({
            ...file,
            users: [...file_users],
        })
    }

    return (
        <div id="file-update">
            <h1>Uredi datoteku</h1>
            <div className="file-input-card input-card">
                {
                    loadingFile ?
                        <Loader />
                        : <>
                            <div className="input-card-row">
                                <label>Tip datoteke</label>
                                <input className="file-card-type" type="text" value={
                                    Object.entries(file_types)
                                        .filter(([file_type_key, file_type], file_type_index) =>
                                            file_type.file_type_id === file?.file_type_id)?.[0]?.[1]?.text
                                } readOnly={true} />
                            </div>
                            <div className="input-card-row">
                                <label>Naziv datoteke</label>
                                <input className="file-card-name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="input-card-row">
                                <label>Javno</label>
                                <input className="file-public" type="checkbox" checked={is_public === 1} onChange={(e) => { setPublic(e.target.checked === true ? 1 : 0) }} />
                            </div>
                            <button className="input-card-submit" onClick={saveFile}>Spremi</button>
                        </>
                }
            </div>
            <div className="file-users-update">
                <div className="file-users">
                    {
                        loadingFile ?
                            <Loader />
                            : file?.users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}>
                                    <div className="user-full-name">{user?.firstname} {user?.lastname}</div>
                                    <div className="user-iss-username">{user?.iss_username}</div>
                                    <div className="user-edu-uid">{user?.edu_uid}</div>
                                    <div className="user-email">{user?.email}</div>
                                    <div className="user-github">{user?.github_profile_link}</div>
                                    <button className="user-remove" onClick={() => { removeUserFromFile(user) }}>Ukloni</button>
                                </div>
                            )
                    }
                </div>
                <div className="file-users-search">
                    <p>Dopusti pristup korisnicima:</p>
                    <input type="text" className="file-users-search-input" onChange={(e) => { updateSearch(e.target.value) }} />
                    {
                        loadingUsers ?
                            <Loader />
                            : users?.map((user, user_index) =>
                                <div className="user-row list-item"
                                    key={user_index}
                                    onClick={() => { addUserToFile(user) }}>
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

export default FileUpdate;
