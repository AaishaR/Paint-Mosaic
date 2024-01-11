import React, { createContext, useContext, useEffect, useState } from 'react';
import apiServiceJWT from '../services/JWTService'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        (async () => {
            if (token) {
                const user = await apiServiceJWT.getUser(token);
                setUser(user);
            }
        })();
    }, [token])

    const login = async (token) => {
        try {
            localStorage.setItem('accessToken', token)
            setToken(token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('accessToken')
            setToken(undefined);
        } catch (error) {
            console.error('Error removing token:', error)
        }
    };

    const getData = async () => {
        try {
            const value = localStorage.getItem('accessToken');
            if (value !== null) setToken(value);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, [token]);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token,
            setToken,
            login,
            logout,
            isAuthenticated,
            user,
            setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};