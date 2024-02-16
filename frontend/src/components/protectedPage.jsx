import useFetch from "../logic/hooks/useFetch"
import React from "react";

export default function ProtectedPage({children}){
    
    const {data, error, loading} = useFetch(`http://${import.meta.env.VITE_BACKENDURL}/users/login`, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("credentials"),
        }
    });

    return (        
        <>
            {
                (loading) ?
                    <h1>Loading</h1>
                :
                (error) ?
                    <h1>Error</h1>
                :
                React.cloneElement(children, {user: data})
            }
        </>
    )
}