import { file_new, file_update } from "../../styles/styles";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import file_types from "../../constants/file_types";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { prefixRoute } from "../../utils/prefix_route";

function FileNew() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [file_type, setFileType] = useState({
        value: file_types.generic.file_type_id,
        label: file_types.generic.text,
        file_type_id: file_types.generic.file_type_id,
    });
    const [name, setName] = useState('');
    const [is_public, setPublic] = useState(0);
    const [users, setUsers] = useState([]);

    const saveFile = () => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("file_type_id", file_type.file_type_id);
        formData.append("name", name);
        formData.append("public", is_public);
        axios.post(`files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            navigate(`${prefixRoute()}/file/${response.data?.result?.insertId}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "done") {
            console.log(status, meta, file);
            setFile(file);
            setName(file?.name)
        }
    }

    return (
        <div id="file-update">
            <h1>Nova datoteka</h1>
            <div className="file-input-card input-card">
                <div className="input-card-row">
                    <label>Tip datoteke</label>
                    <Select
                        isSearchable={false}
                        isClearable={false}
                        isMulti={false}
                        value={file_type ?? ''}
                        placeholder={"Odaberi Tip"}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        onChange={(option) => { setFileType(option) }}
                        options={Object.entries(file_types).map(([file_type_key, file_type], file_type_index) => {
                            return {
                                value: file_type.file_type_id,
                                label: file_type.text,
                                file_type_id: file_type.file_type_id,
                            }
                        }
                        )}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="input-card-row">
                    <label>Naziv datoteke</label>
                    <input className="card-name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="input-card-row">
                    <Dropzone
                        addClassNames={{
                            dropzone: "file-upload-dropzone",
                            dropzoneActive: "file-upload-dropzone-active",
                            preview: "file-upload-preview",
                            previewImage: "file-upload-preview-image",
                            inputLabel: "file-upload-input-label"
                        }}
                        onChangeStatus={handleChangeStatus}
                        accept="*"
                        maxFiles={1}
                        multiple={false}
                        inputContent={"Prenesi datoteku ili klikni za odabir"}
                    />
                </div>
                <div className="input-card-row">
                    <label>Javno</label>
                    <input className="card-public" type="checkbox" checked={is_public === 1} onChange={(e) => { setPublic(e.target.checked === true ? 1 : 0) }} />
                </div>
                <button className="input-card-submit" onClick={saveFile}>Spremi</button>
            </div>
            <div className="card-users">
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

export default FileNew;
