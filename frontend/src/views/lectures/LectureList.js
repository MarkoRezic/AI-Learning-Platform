import { lecture_list } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import LectureDropdown from "./LectureDropdown";
import { prefixRoute } from "../../utils/prefix_route";
import { DataContext } from "../../Context";

function LectureList({ user, ...rest }) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [lectureList, setLectureList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`lectures${user === true ? `/user/${context?.user?.user_id}` : ''}`).then((response) => {
            console.log(response.data);
            setLectureList(response.data?.result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [user]);

    const openLectureDetails = (lecture, e) => {
        e?.stopPropagation();
        console.log(`${prefixRoute()}/lecture${user === true ? `s` : ''}/${lecture?.lecture_id}`)
        navigate(`${prefixRoute()}/lecture${user === true ? `s` : ''}/${lecture?.lecture_id}`);
    }

    return (
        <div id="lecture-list">
            {
                loading ?
                    <Loader />
                    : <LectureDropdown lectureList={lectureList} onClick={openLectureDetails} />
            }
            <h1>Molimo odaberite lekciju iz popisa</h1>
        </div>
    );
}

export default LectureList;
