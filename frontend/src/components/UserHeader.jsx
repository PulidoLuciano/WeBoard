import { Link } from "react-router-dom"
import ProfileImage from "../assets/images/profile.svg"
import AccountImage from "../assets/images/account.svg"
import SettingImage from "../assets/images/setting.svg"
import LogoutImage from "../assets/images/logout.svg"

export default function UserHeader({user}){
    
    function logOut(){
        localStorage.removeItem("credentials");
        location.href("/");
    }
    
    return(
        <nav className="group relative min-w-[150px] hover:bg-slate-900">
            <Link to={`/user/${user.username}`} className=" flex gap-2 hover:scale-105 transition-transform">
                <img src={user.photo ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt="User's profile image" className=" size-8 rounded-full"/>
                <p className="text-white font-bold text-xl max-sm:hidden">{user.username}</p>
            </Link>
            <div className="absolute bg-slate-900 flex-col p-3 w-full text-xl hidden group-hover:flex">
                <Link to={`/user/${user.username}`} className=" flex gap-2 hover:scale-105 transition-transform p-2"><img src={ProfileImage} alt="Profile icon"/> Profile</Link>
                <hr></hr>
                <Link to={`/account`} className=" flex gap-2 hover:scale-105 transition-transform p-2"><img src={AccountImage} alt="Account icon"/> Account</Link>
                <hr></hr>
                <Link to={`/settings`} className=" flex gap-2 hover:scale-105 transition-transform p-2"><img src={SettingImage} alt="Settings icon"/> Settings</Link>
                <hr></hr>
                <Link to={`/`} className=" flex gap-2 hover:scale-105 transition-transform p-2" onClick={logOut}><img src={LogoutImage} alt="Logout icon"/> Log out</Link>
            </div>
        </nav>
    )
}