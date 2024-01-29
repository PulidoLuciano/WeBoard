import { Link } from "react-router-dom"

export default function LinkHeader({href, text}){
    return(
        <>
            <Link to={href} className=" text-white font-bold text-xl inline">{text}</Link>
        </>
    )
}