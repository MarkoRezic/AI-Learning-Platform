import { file_list } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import file_types from "../../constants/file_types";
import LinesEllipsis from 'react-lines-ellipsis';
import DEFAULT_AVATAR from '../../images/default_avatar.png';
import { DataContext } from "../../Context";
import { prefixRoute } from "../../utils/prefix_route";
import { FileIcon, defaultStyles } from 'react-file-icon';
import { getExtension } from "../../utils/get_extension";

function FileList({ user, access, ...rest }) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`files${user === true ? `/user/${context?.user?.user_id}` : access === true ? `/access` : ''}`).then((response) => {
            console.log(response.data);
            setFileList(response.data?.result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [user, access]);

    const openFileDetails = (file) => {
        navigate(`${prefixRoute()}/file/${file?.file_id}`);
    }

    return (
        <div id="file-list">
            <h1>{user === true ? "Moje" : "Sve"} datoteke</h1>
            {
                loading ?
                    <Loader />
                    : <div className="file-list-wrap">
                        {
                            fileList.map((file, file_index) =>
                                <div className="file-list-item" key={file_index} onClick={() => { openFileDetails(file) }}>
                                    <p className="file-list-item-name">{file?.name} <img src={file?.avatar_url ?? DEFAULT_AVATAR} /></p>
                                    <p className="file-list-item-type">{Object.values(file_types).find(file_type => file_type.file_type_id === file?.file_type_id)?.text} <span>{file?.public === 1 ? "JAVNO" : `PRIVATNO(${file?.user_count + 1})`}</span></p>
                                    <FileIcon extension={getExtension(file?.uuid_name)} {...defaultStyles[getExtension(file?.uuid_name)]} />
                                    <p className="file-list-item-public"></p>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default FileList;
