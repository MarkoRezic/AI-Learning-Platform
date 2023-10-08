import React from 'react';
import { useState, createContext, useEffect } from 'react';
import axios from './axios';

export const DataContext = createContext();

export const DataProvider = (props) => {

    const {
        loading,
        setLoading,
        user,
        setUser,
        adminLogin,
        adminRegister,
        logout,
    } = useProviderFunctions()

    return (
        <DataContext.Provider value={
            {
                loading,
                setLoading,
                user,
                setUser,
                adminLogin,
                adminRegister,
                logout,
            }
        }>
            {props.children}
        </DataContext.Provider>
    );
}

const useProviderFunctions = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('auth').then((response => {
            console.log(response);
            setUser(response?.data?.result);
            setLoading(false);
        })).catch((error) => {
            console.log(error)
            if ([401, 403, 404].includes(error?.response?.status)) {

            }
            setLoading(false);
        })
        return () => {

        }
    }, [])

    const adminLogin = (email, password, { callback, errorCallback }) => {
        axios.post('auth/admin-login', {
            email,
            password
        }).then((response => {
            console.log(response);
            setUser(response?.data?.result);
            callback?.(response)
        })).catch((error) => {
            console.log(error)
            errorCallback?.(error)
        })
    }

    const adminRegister = (firstname, lastname, email, password, admin_secret, { callback, errorCallback }) => {
        axios.post('auth/admin-register', {
            firstname,
            lastname,
            email,
            password,
            admin_secret
        }).then((response => {
            console.log(response);
            callback?.(response)
        })).catch((error) => {
            console.log(error)
            errorCallback?.(error)
        })
    }

    const logout = () => {
        window.location.href = `${window.env.ORIGIN_BACKEND}/auth/logout`;
    }

    return {
        loading,
        setLoading,
        user,
        setUser,
        adminLogin,
        adminRegister,
        logout,
    }

}