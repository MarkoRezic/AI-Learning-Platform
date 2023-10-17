import { file_details } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import file_types from "../../constants/file_types";
import { openInNewTab } from "../../utils/open_in_new_tab";
import { downloadFileFromUrl } from "../../utils/download_file_from_url";
import local_storage_keys from "../../constants/local_storage_keys";
import { prefixRoute } from "../../utils/prefix_route";

function FileDetails() {
    const navigate = useNavigate();
    const { file_id } = useParams();
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [loadingFile, setLoadingFile] = useState(true);
    const [loadingText, setLoadingText] = useState(true);

    useEffect(() => {
        axios.get(`files/${file_id}`).then((response) => {
            console.log(response.data);
            setFile(response.data?.result);
            setLoadingFile(false);
        }).catch((error) => {
            console.log(error);
            setLoadingFile(false);
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
        });

        axios.get(`files/extract/${file_id}`).then((response) => {
            console.log(response.data);
            setText(response.data?.result);
            setLoadingText(false);
        }).catch((error) => {
            console.log(error);
            setLoadingText(false);
        });
    }, []);

    const openUserDetails = (user) => {
        navigate(`${prefixRoute()}/user/${user?.user_id}`);
    }

    const updateFile = () => {
        navigate(`${prefixRoute()}/update-file/${file_id}`);
    }

    const openFile = () => {
        openInNewTab(`${window.env.ORIGIN_BACKEND}/uploads/${file?.uuid_name}`);
    }

    const downloadFile = () => {
        downloadFileFromUrl(file?.file_url, file?.name);
    }

    const generateCard = (e) => {
        localStorage.setItem(local_storage_keys.generate_card, JSON.stringify({ file: { ...file, text } }));
        navigate(`${prefixRoute()}/new-card`);
    }

    return (
        <div id="file-details">
            <h1>Detalji datoteke</h1>
            <div className="file-card shadow-large dip-mid rounded-large  ">
                {
                    loadingFile ?
                        <Loader />
                        : <>
                            <div className="file-card-info">
                                <div className="file-creator shadow-inset-small rounded-mid" onClick={(e) => {
                                    openUserDetails({
                                        user_id: file?.creator_id
                                    })
                                }}><img src={file?.creator_avatar_url} />{file?.creator_firstname} {file?.creator_lastname}</div>
                                <div className="file-name shadow-inset-small rounded-mid">{file?.name}</div>
                                <div className="file-type shadow-inset-small rounded-mid">{file?.file_type_text}</div>
                                <div className="file-text shadow-inset-small rounded-mid">{
                                    loadingText ?
                                        <Loader />
                                        : text
                                }</div>
                                <div className="file-public shadow-inset-small rounded-mid">{file?.public === 1 ? "JAVNO" : "PRIVATNO"}</div>
                            </div>
                            <div className="file-card-actions details-actions">
                                <button className="" onClick={updateFile}>Uredi</button>
                                <button className="" onClick={openFile}>Otvori</button>
                                <button className="" onClick={downloadFile}>Preuzmi</button>
                                <button className="" onClick={generateCard}>Sažmi</button>
                            </div>
                        </>
                }
            </div>
            <div className="file-users">
                {
                    loadingFile ?
                        <Loader />
                        : file?.users?.map((user, user_index) =>
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

export default FileDetails;
