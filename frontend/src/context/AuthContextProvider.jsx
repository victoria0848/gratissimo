import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


export const AuthContext = createContext(null);

export const AuthcontextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

    // Tidslogik
    const now = new Date().getTime();
    const twoHoursFromNow = now + 2 * 60 * 60 * 1000;
    const expireTime = new Date(twoHoursFromNow);

    useEffect(() => {
        if (authToken) {
            setCookie("authToken", authToken?.accessToken || authToken, { expires: expireTime, path: "/" });
        }
        console.log("Auth token: ", authToken);
    }, [authToken, setCookie]); 

    // Persistent Session: 
    if (!authToken && cookies?.authToken) {
        setAuthToken(cookies.authToken);
        console.log("cookies:", cookies.authToken);
    }

    function logout() {
        setAuthToken(null);
        removeCookie("authToken", { path: "/" });
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};