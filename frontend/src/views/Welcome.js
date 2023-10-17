import { useContext } from "react";
import { welcome } from "../styles/styles";
import { DataContext } from "../Context";

function Welcome() {
    const context = useContext(DataContext);

    return (
        <div id="welcome">
            <h1>Dobrodošli,</h1>
            <h2>{context?.user?.firstname}</h2>
        </div>
    );
}

export default Welcome;
