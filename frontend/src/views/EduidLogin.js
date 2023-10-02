import "../styles/EduidLogin.css";
import { useEffect } from "react";
import axios from "axios";
import EDUID_LOGO from "../images/eduid_logo.svg"

function EduidLogin() {

    useEffect(() => {
        const eduid_token = new URLSearchParams(window.location.search).get(
            "eduid_token"
        );
        console.log(eduid_token)

        if (eduid_token != null && eduid_token !== '') {
            axios.post(`${window.env.ORIGIN_BACKEND}/auth/login`, {
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
        <div id="eduid-login">
            <img
                src={EDUID_LOGO}
                width="150"
            ></img>
            <h1>Sign in with eduID</h1>
            <button
                className="btn primary"
                onClick={() => { window.location.href = `${window.env.ORIGIN_BACKEND}/auth/eduid/authorize` }}
            >
                Sign in
            </button>
        </div>
    );
}

export default EduidLogin;
