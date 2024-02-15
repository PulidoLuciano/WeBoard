import React, { useEffect } from "react"
import useFetch from "../logic/hooks/useFetch"

export default function FetchingPage({children, url}){
    
    const {data, error, loading} = useFetch(url);
    
    useEffect(() => {
        console.log(data, error, loading);
    }, [data, error, loading]);

    return (
        <>
        {
            (loading) ?
            <h1>Loading</h1>
            :
            (error) ?
            <h1>Error: {url}</h1>
            :
            React.cloneElement(children, {
                data
            })
        }
        </>
    )
}