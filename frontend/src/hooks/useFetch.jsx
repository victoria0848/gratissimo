import { useState, useEffect, useContext } from "react"; 
import { AuthContext } from "../context/AuthContextProvider"; 

const BASE_URL = "http://localhost:4000/api";

export function useFetch(endpoint) { 
    const [data, setData] = useState(null); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        if (!endpoint) return; 

        const getData = async () => {
            setIsLoading(true);
            try {
                const headers = {
                    "Content-Type": "application/json"
                }; 

                const tokenStr = authToken?.accessToken || authToken;

                if (tokenStr) {
                    headers["Authorization"] = `Bearer ${tokenStr}`;
                }

                const res = await fetch(`${BASE_URL}${endpoint}`, {
                    method: "GET",
                    headers: headers
                });

                if (!res.ok) {
                    throw new Error("Error fetching data");
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };        

        getData();
    }, [endpoint, authToken]);

    return { data, error, isLoading };
}