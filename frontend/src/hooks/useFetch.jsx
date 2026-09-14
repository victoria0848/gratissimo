import { useState, useEffect } from "react";


const BASE_URL = "http://localhost:4000/api";

export function useFetch(endpoint) { 
    const [data, setData] = useState(null); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!endpoint) return; 

        const getData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL}${endpoint}`);
                
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
    }, [endpoint]);

    return { data, error, isLoading };
}