import { Link } from "react-router-dom"

export default function UserHeader({user}){
    return(
        <Link to={`/user/${user.username}`} className=" flex gap-2 hover:scale-105 transition-transform">
            <img src={user.photo ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt="User's profile image" className=" size-8 rounded-full"/>
            <p className="text-white font-bold text-xl max-sm:hidden">{user.username}</p>
        </Link>
    )
}