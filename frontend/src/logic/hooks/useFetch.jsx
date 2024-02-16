import { useEffect, useState } from "react";

export default function useFetch(url, options = null){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function doFetch(){
            let response = await fetch(url, options);
            setData(await response.json());
            if(!response.ok) setError(true);
            setLoading(false);
        }
        doFetch();
    }, []);

    return {loading, data, error};
}