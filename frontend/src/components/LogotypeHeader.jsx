import { Link } from "react-router-dom";
import Image from "../assets/Logo-white.png"

export default function Logotype(){
    return(
    <>
        <Link to={"/"} className=" outline-none h-full min-w-44">
            <img src={Image} alt="Weboard logo" className="h-full"/>
        </Link>
    </>
    )
}