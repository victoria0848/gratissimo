import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [user, setUser] = useState(null);
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

    useEffect(() => {
        const fetchUserData = async () => {
            const activeToken = authToken?.accessToken || authToken || cookies?.authToken;
            if (!activeToken) return;
            try {
                const res = await fetch("http://localhost:4000/api/verify", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${activeToken}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data); // Gemmer 'viki' data live i din statskasse!
                }
            } catch (err) {
                console.error("Kunne ikke verificere token", err);
            }
        };

        fetchUserData();
    }, [authToken, cookies?.authToken]);

    function logout() {
        setAuthToken(null);
        removeCookie("authToken", { path: "/" });
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};