import Logotype from "./LogotypeHeader";
import UserHeader from "./UserHeader";
import LinkHeader from "./LinkHeader";

export default function Header({user}){
    return(
        <header className=" h-16 p-4 flex justify-center">
            <div className="flex justify-between h-full items-center max-w-screen-xl w-full">
                <Logotype></Logotype>
                {
                    (user) 
                    ? //There is a username picked?
                    <UserHeader user={user}></UserHeader>
                    :
                    <LinkHeader text={"Pick a username"} href={"/login"}></LinkHeader>
                }
            </div>
        </header>
    )
}