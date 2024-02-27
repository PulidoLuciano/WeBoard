import Button from "./Button"
import helpImage from "../assets/images/help.svg"
import leaderImage from "../assets/images/leaderBoard.svg"
import { Link } from "react-router-dom"

export default function GameCard({children, game}){
    
    async function makeQueuePetition(){
        const credentials = localStorage.getItem("credentials")
        if(!credentials){
            location.href = "/login";
            return;
        }
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/rooms`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + credentials,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({gameId: game._id}),
        });

        const data = await response.json();
        if(!response.ok){
            console.error(data);
        }
        location.href = "/room/" + data._id;
        return;
    }

    return(
        <div className="relative bg-slate-900 w-80 h-60 rounded-xl overflow-hidden mx-auto">
            <div className="absolute flex justify-between z-10 top-0 left-0 w-full h-1/4 items-center px-3 bg-slate-900 bg-opacity-30">
                <h2 className="[text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">{children}</h2>
            </div>
            <img src={game.image} alt={`${game.name}'s image`} className="w-full h-full"/>
            <div className="absolute flex justify-between z-10 bottom-0 left-0 w-full h-1/4 items-center px-3 bg-slate-900 bg-opacity-30 backdrop-blur-md">
                <div>
                    <Link to={`/${game.name}/instructions`}>
                        <Button className={"size-9 mr-3 bg-slate-900"}>
                            <img src={helpImage} alt="Help button"/>
                        </Button>
                    </Link>
                    <Link to={`/${game.name}/ranking`}>
                        <Button className={"size-9 mr-3 bg-slate-900"}>
                            <img src={leaderImage} alt="Leader board button" />    
                        </Button> 
                    </Link>
                </div>
                    <Button className={"h-9 w-24 bg-green-800 font-bold"} onClick={makeQueuePetition}>Play</Button>
            </div>
        </div>
    )
}