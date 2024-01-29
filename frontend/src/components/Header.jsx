import Logotype from "./LogotypeHeader";
import UserHeader from "./UserHeader";
import LinkHeader from "./LinkHeader";

export default function Header(){
    return(
        <header className=" h-16 p-4 flex justify-center">
            <div className="flex justify-between h-full items-center max-w-screen-xl w-full">
                <Logotype></Logotype>
                {
                    (true) 
                    ? //There is a username picked?
                    <UserHeader userId={1} username={"PepeGrillo"}></UserHeader>
                    :
                    <LinkHeader text={"Username"} href={"/login"}></LinkHeader>
                }
            </div>
        </header>
    )
}