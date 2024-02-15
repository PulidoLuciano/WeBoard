import React, { useEffect } from "react"
import useFetch from "../logic/hooks/useFetch"
import { useParams } from "react-router-dom";
import replaceParams from "../logic/replaceParams";

export default function FetchingPage({children, url}){
    
    const params = useParams();
    const {data, error, loading} = useFetch(replaceParams(url, params));
    
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