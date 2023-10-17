import { lecture_list } from "../../styles/styles";
import Dropdown from 'react-multilevel-dropdown';
import CHEVRON_RIGHT from '../../images/chevron_right.png';

function LectureDropdown({ currentLecture, lectureList, onClick, ...rest }) {

    return (
        currentLecture == null ?
            <Dropdown
                title='Popis lekcija'
                openOnHover={true}
                position="right"
                wrapperClassName="lecture-dropdown-wrapper"
                buttonClassName="lecture-dropdown-button"
                menuClassName="lecture-dropdown-menu"
            >
                {
                    lectureList?.map((lecture, lecture_index) =>
                        <LectureDropdown
                            key={lecture_index}
                            currentLecture={lecture}
                            lectureList={lecture?.child_lectures}
                            onClick={onClick} />
                    )
                }
            </Dropdown>
            :
            <Dropdown.Item className="lecture-dropdown-item" onClick={(e) => { onClick(currentLecture, e) }}>
                <p>{currentLecture?.name}</p>
                {
                    lectureList?.length > 0 ?
                        <>
                            <img src={CHEVRON_RIGHT} />
                            <Dropdown.Submenu
                                position="right"
                                className="lecture-dropdown-submenu"
                            >
                                {
                                    lectureList?.map((lecture, lecture_index) =>
                                        <LectureDropdown
                                            key={lecture_index}
                                            currentLecture={lecture}
                                            lectureList={lecture?.child_lectures}
                                            onClick={onClick} />
                                    )
                                }
                            </Dropdown.Submenu>
                        </>
                        : null
                }
            </Dropdown.Item>
    );
}

export default LectureDropdown;
