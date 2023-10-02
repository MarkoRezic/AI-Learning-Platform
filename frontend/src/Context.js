import React from 'react';
import { useState, createContext, useEffect } from 'react';
import axios from './axios';

export const DataContext = createContext();

export const DataProvider = (props) => {

    const {
        user,
        setUser,
        logout,
    } = useProviderFunctions()

    return (
        <DataContext.Provider value={
            {
                user,
                setUser,
                logout,
            }
        }>
            {props.children}
        </DataContext.Provider>
    );
}

const useProviderFunctions = () => {
    const [user, setUser] = useState(null);

    const logout = () => {
        window.location.href = `${window.env.ORIGIN_BACKEND}/auth/logout`;
    }

    useEffect(() => {
        axios.get('auth').then((response => {
            console.log(response);
            setUser(response?.data?.result);
        })).catch((error) => {
            console.log(error)
            if ([401, 403, 404].includes(error?.response?.status)) {

            }
        })
        return () => {

        }
    }, [])

    return {
        user,
        setUser,
        logout,
    }

}