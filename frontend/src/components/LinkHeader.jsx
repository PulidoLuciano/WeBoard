import { Link } from "react-router-dom"

export default function LinkHeader({href, text}){
    return(
        <>
            <Link to={href} className=" text-white font-bold text-xl inline hover:scale-105 transition-transform text-center">{text}</Link>
        </>
    )
}