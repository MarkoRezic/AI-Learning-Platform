import "../styles/Error404.css";
import { Link } from "react-router-dom";

function Error404() {

    return (
        <div id="error404">
            <h1>404</h1>
            <h3>Stranica nije pronađena.</h3>
            <Link to={"/"}>Natrag na početnu</Link>
        </div>
    );
}

export default Error404;
