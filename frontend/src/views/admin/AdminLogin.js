import "../../styles/AdminLogin.css";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { DataContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ADMIN_LOGIN from "../../images/admin_login.png"

function AdminLogin() {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin_secret, setAdminSecret] = useState('');
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        general: null,
    });
    const [loading, setLoading] = useState(false);

    const resetErrors = () => {
        setErrors({
            email: null,
            password: null,
            general: null,
        });
    }

    const toggleRegister = (e) => {
        setRegister(!register)
    }

    const updateFirstname = (e) => {
        setFirstname(e?.target?.value)
    }

    const updateLastname = (e) => {
        setLastname(e?.target?.value)
    }

    const updateEmail = (e) => {
        setEmail(e?.target?.value)
    }

    const updatePassword = (e) => {
        setPassword(e?.target?.value)
    }

    const updateAdminSecret = (e) => {
        setAdminSecret(e?.target?.value)
    }

    const adminLogin = (e) => {
        e?.preventDefault();
        setLoading(true);
        resetErrors();
        context.adminLogin(email, password, {
            callback: (response) => {
                setLoading(false);
                navigate('/')
            },
            errorCallback: (error) => {
                if ([404].includes(error?.response?.status)) {
                    setErrors({
                        ...errors,
                        email: error?.response?.data?.message
                    })
                }
                else if ([401].includes(error?.response?.status)) {
                    setErrors({
                        ...errors,
                        password: error?.response?.data?.message
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        general: error?.response?.data?.message
                    })
                }
                setLoading(false);
            }
        });
    }

    const adminRegister = (e) => {
        e?.preventDefault();
        resetErrors();
        setLoading(true);
        context.adminRegister(firstname, lastname, email, password, admin_secret, {
            callback: (response) => {
                setLoading(false);
                setRegister(false);
                adminLogin(e)
            },
            errorCallback: (error) => {
                if ([404].includes(error?.response?.status)) {
                    setErrors({
                        ...errors,
                        email: error?.response?.data?.message
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        general: error?.response?.data?.message
                    })
                }
                setLoading(false);
            }
        });
    }

    return (
        <div id="admin-login">
            <img
                src={ADMIN_LOGIN}
                width="150"
            ></img>
            <h1>Admin {!register ? 'Prijava' : 'Registracija'}</h1>
            {
                register ?
                    <>
                        <input type="text" placeholder="Ime" value={firstname} onChange={updateFirstname} />
                        <input type="text" placeholder="Prezime" value={lastname} onChange={updateLastname} />
                    </>
                    : null
            }
            <input type="text" placeholder="example@example.com" value={email} onChange={updateEmail} />
            <p>{errors.email}</p>
            <input type="password" placeholder="********" value={password} onChange={updatePassword} />
            <p>{errors.password}</p>
            {
                register ?
                    <input type="password" placeholder="Admin Lozinka" value={admin_secret} onChange={updateAdminSecret} />
                    : null
            }
            <button
                className="btn primary"
                onClick={!register ? adminLogin : adminRegister}
                disabled={loading}
            >
                {!loading ? (!register ? 'Prijavi se' : 'Registriraj se') : <Loader />}
            </button>
            <p>{errors.general}</p>
            <button
                className="btn primary"
                onClick={toggleRegister}
                disabled={loading}
            >
                {!loading ? (!register ? 'Idi na registraciju' : 'Idi na prijavu') : <Loader />}
            </button>
        </div>
    );
}

export default AdminLogin;
