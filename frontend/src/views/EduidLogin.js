import { eduid_login } from "../styles/styles";
import { useEffect } from "react";
import axios from "../axios";
import EDUID_LOGO from "../images/eduid_logo.svg"

function EduidLogin() {

    useEffect(() => {
        const eduid_token = new URLSearchParams(window.location.search).get(
            "eduid_token"
        );
        console.log(eduid_token)

        if (eduid_token != null && eduid_token !== '') {
            axios.post(`auth/login`, {
                eduid_token
            }).then((response) => {
                console.log(response.data);
                window.location.replace('/');
            }).catch((error) => {
                console.log(error);
                if ([403].includes(error?.response?.status))
                    window.location.replace('/');
            });
        }
    }, []);

    return (
        <div id="eduid-login" className="shadow-mid shadow-smooth-small rounded-xlarge ">
            <img className="shadow-xlarge shadow-inset-mid border-mid rounded-xlarge "
                src={EDUID_LOGO}
                width="150"
            ></img>
            <h1 className="text-shadow-small">Prijava putem eduID</h1>
            <button
                className="shadow-small shadow-smooth-mid dip-small rounded-mid text-shadow-small active-invert transition-smooth text-color-light"
                onClick={() => { window.location.href = `${window.env.ORIGIN_BACKEND}/auth/eduid/authorize` }}
            >
                Prijavi se
            </button>
        </div>
    );
}

export default EduidLogin;
