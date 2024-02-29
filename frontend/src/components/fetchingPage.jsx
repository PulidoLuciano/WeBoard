import React, { useEffect } from "react"
import useFetch from "../logic/hooks/useFetch"
import { useParams } from "react-router-dom";
import replaceParams from "../logic/replaceParams";
import LoadingPage from "../pages/loading";
import Error from "../pages/error";

export default function FetchingPage({children, url, options = null}){
    
    const params = useParams();
    const {data, error, loading} = useFetch(replaceParams(url, params), options);

    return (
        <>
        {
            (loading) ?
            <LoadingPage></LoadingPage>
            :
            (error) ?
            <Error error={data}></Error>
            :
            React.cloneElement(children, {
                data
            })
        }
        </>
    )
}