import { lecture_details } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import LectureDropdown from "./LectureDropdown";
import CHEVRON_RIGHT from '../../images/chevron_right.png';
import local_storage_keys from "../../constants/local_storage_keys";
import { prefixRoute } from "../../utils/prefix_route";
import { DataContext } from "../../Context";
import roles from "../../constants/roles";

function LectureDetails({ user, ...rest }) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const { lecture_id } = useParams();
    const [lecture, setLecture] = useState(null);
    const [lectureList, setLectureList] = useState([]);
    const [technologyList, setTechnologyList] = useState([]);
    const [loadingLecture, setLoadingLecture] = useState(true);
    const [loadingLectureList, setLoadingLectureList] = useState(true);
    const [loadingTechnologyList, setLoadingTechnologyList] = useState(true);

    useEffect(() => {
        axios.get(`lectures/${lecture_id}`).then((response) => {
            console.log(response.data);
            setLecture(response.data?.result);
            setLoadingLecture(false);
        }).catch((error) => {
            console.log(error);
            setLoadingLecture(false);
            if ([401, 403, 404].includes(error?.response?.status)) {
                navigate("/error");
            }
        });

        axios.get(`lectures${user === true ? `/user/${context?.user?.user_id}` : ''}`).then((response) => {
            console.log(response.data);
            setLectureList(response.data?.result);
            setLoadingLectureList(false);
        }).catch((error) => {
            console.log(error);
            setLoadingLectureList(false);
        });

        axios.get(`technologies/lecture/${lecture_id}`).then((response) => {
            console.log(response.data);
            setTechnologyList(response.data?.result);
            setLoadingTechnologyList(false);
        }).catch((error) => {
            console.log(error);
            setLoadingTechnologyList(false);
        });
    }, [lecture_id, user]);

    const openLectureDetails = (lecture, e) => {
        e?.stopPropagation();
        navigate(`${prefixRoute()}/lecture${user === true ? `s` : ''}/${lecture?.lecture_id}`);
    }

    const generateCard = (e) => {
        localStorage.setItem(local_storage_keys.generate_card, JSON.stringify({ lecture }));
        navigate(`${prefixRoute()}/new-card`);
    }

    const joinLecture = (e) => {
        axios.put(`lectures/join/${lecture_id}`).then((response) => {
            console.log(response.data);
            setLecture({
                ...lecture,
                user_id: context?.user?.user_id,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    const leaveLecture = (e) => {
        axios.delete(`lectures/leave/${lecture_id}`).then((response) => {
            console.log(response.data);
            setLecture({
                ...lecture,
                user_id: null,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id="lecture-details">
            <div className="lectures-dropdown">
                {
                    loadingLectureList ?
                        <Loader />
                        : <LectureDropdown lectureList={lectureList} onClick={openLectureDetails} />
                }
            </div>
            <div className="lecture-card shadow-large dip-mid rounded-large  ">
                {
                    loadingLecture ?
                        <Loader />
                        : <div className="lecture-content">
                            <div className="lecture-header">
                                {
                                    lecture?.parent_lecture_id != null ?
                                        <Link className="lecture-return" to={`${prefixRoute()}/lecture/${lecture?.parent_lecture_id}`}>
                                            <img src={CHEVRON_RIGHT} />Natrag na glavno poglavlje: {lecture?.parent_lecture_name}
                                        </Link>
                                        : null
                                }
                                {
                                    context?.user?.role_id === roles.user.role_id ?
                                        <div className="lecture-header-actions">
                                            <div className="generate-card-button" onClick={generateCard}>Generiraj karticu</div>
                                            <div className="lecture-join-button" onClick={lecture?.user_id == null ? joinLecture : leaveLecture}>{lecture?.user_id == null ? "Prati" : "Otprati"} lekciju</div>
                                        </div>
                                        : null
                                }
                            </div>
                            <h1>{lecture?.name}</h1>
                            <h3>{lecture?.description}</h3>
                            <div className="keyword-list">Ključne riječi: {lecture?.keywords?.split(",")?.map((keyword, keyword_index) =>
                                <div className="keyword-chip" key={keyword_index}>{keyword}</div>
                            )}</div>
                            {
                                loadingTechnologyList ?
                                    <Loader />
                                    : technologyList?.length > 0 ?
                                        <>Tehnologije:
                                            <div className="technology-list">{technologyList?.map((technology, technology_index) =>
                                                <div className="technology-icon" key={technology_index}>
                                                    <div className="img-wrapper">
                                                        <img src={technology?.logo_url} />
                                                    </div>
                                                    {technology?.name}
                                                </div>
                                            )}</div>
                                        </>
                                        : null
                            }
                            <div className="lecture-text">
                                <pre>{lecture?.text}</pre>
                            </div>
                            {
                                lecture?.child_lectures?.length > 0 ?
                                    <div className="child-lecture-list">
                                        U ovom poglavlju:
                                        {
                                            lecture?.child_lectures?.map((child_lecture, child_lecture_index) =>
                                                <Link className="child-lecture-link" to={`${prefixRoute()}/lecture/${child_lecture?.lecture_id}`} key={child_lecture_index}>{child_lecture?.name}</Link>
                                            )
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default LectureDetails;
