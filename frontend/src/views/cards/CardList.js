import { card_list } from "../../styles/styles";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import card_types from "../../constants/card_types";
import LinesEllipsis from 'react-lines-ellipsis';
import DEFAULT_AVATAR from '../../images/default_avatar.png';
import { prefixRoute } from "../../utils/prefix_route";
import { DataContext } from "../../Context";

function CardList({ user, access, ...rest }) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`cards${user === true ? `/user/${context?.user?.user_id}` : access === true ? `/access` : ''}`).then((response) => {
            console.log(response.data);
            setCardList(response.data?.result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [user, access]);

    const openCardDetails = (card) => {
        navigate(`${prefixRoute()}/card/${card?.card_id}`);
    }

    return (
        <div id="card-list">
            <h1>{user === true ? "Moje" : "Sve"} kartice</h1>
            {
                loading ?
                    <Loader />
                    : <div className="card-list-wrap">
                        {
                            cardList.map((card, card_index) =>
                                <div className="card-list-item" key={card_index} onClick={() => { openCardDetails(card) }}>
                                    <p className="card-list-item-name">{card?.name} <img src={card?.avatar_url ?? DEFAULT_AVATAR} /></p>
                                    <p className="card-list-item-type">{Object.values(card_types).find(card_type => card_type.card_type_id === card?.card_type_id)?.text}</p>
                                    {card?.question?.length > 0 ?
                                        <LinesEllipsis
                                            className="card-list-item-question"
                                            text={card?.question}
                                            maxLine='1'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters'
                                        />
                                        : null}
                                    <LinesEllipsis
                                        className="card-list-item-text"
                                        text={card?.text}
                                        maxLine='3'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                    />
                                    <p className="card-list-item-public">{card?.public === 1 ? "JAVNO" : `PRIVATNO (dijeljeno sa ${card?.user_count} drugih korisnika)`}</p>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default CardList;
