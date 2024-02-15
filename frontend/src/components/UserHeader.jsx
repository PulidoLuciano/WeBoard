import { Link } from "react-router-dom"
import ProfileImage from "../assets/images/profile.svg"
import AccountImage from "../assets/images/account.svg"
import SettingImage from "../assets/images/setting.svg"
import LogoutImage from "../assets/images/logout.svg"
import MenuImage from "../assets/images/menu.svg"
import CloseImage from "../assets/images/close.svg"
import { useState } from "react"

export default function UserHeader({user}){
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function logOut(){
        localStorage.removeItem("credentials");
        location.href("/");
    }

    function clickMenuButton(){
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    
    return(
        <>
        <nav className="group relative min-w-[150px] hover:bg-slate-900 max-md:hidden">
            <Link to={`/user/${user.username}`} className=" flex gap-2 hover:scale-105 transition-transform">
                <img src={user.photo} alt="User's profile image" className=" size-8 rounded-full"/>
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
        <nav className="md:hidden flex items-center">
            <button onClick={clickMenuButton}>
                {
                    (!isMobileMenuOpen) ?
                    <img src={MenuImage} alt="Menu icon" className="size-8"/>
                    :
                    <img src={CloseImage} alt="Menu icon" className="size-8"/>
                }
            </button>
            <div className={`absolute z-50 h-full bg-slate-900 top-16 left-0 w-full transition-transform text-4xl ${(isMobileMenuOpen) ? "" : "-translate-x-full"}`}>
                <Link to={`/user/${user.username}`} className=" flex gap-2 hover:scale-105 transition-transform p-2" onClick={clickMenuButton}><img src={ProfileImage} alt="Profile icon"/> Profile</Link>
                <hr></hr>
                <Link to={`/account`} className=" flex gap-2 hover:scale-105 transition-transform p-2" onClick={clickMenuButton}><img src={AccountImage} alt="Account icon"/> Account</Link>
                <hr></hr>
                <Link to={`/settings`} className=" flex gap-2 hover:scale-105 transition-transform p-2" onClick={clickMenuButton}><img src={SettingImage} alt="Settings icon"/> Settings</Link>
                <hr></hr>
                <Link to={`/`} className=" flex gap-2 hover:scale-105 transition-transform p-2" onClick={logOut}><img src={LogoutImage} alt="Logout icon"/> Log out</Link>
            </div>
        </nav>
        </>
    )
}