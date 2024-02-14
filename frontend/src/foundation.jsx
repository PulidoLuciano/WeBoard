import { useEffect, useState } from "react"
import Header from "./components/Header"
import initializeUser from "./logic/initializeUser";
import { Outlet } from "react-router-dom";

export default function Foundation(){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        initializeUser(setUser);
    }, [])

    return(
        <>
            <Header user={user}></Header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}