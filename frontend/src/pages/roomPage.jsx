import FetchingPage from "../components/fetchingPage";
import Minesweeper from "../games/minesweeper/minesweeper";

export default function RoomPage(){
    return(
        <>
            <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/rooms/:roomId`} options={{
                headers:{
                    "Authorization": "BEARER " + localStorage.getItem("credentials"),
                }
            }}>
                <Content></Content>
            </FetchingPage>
        </>
    )
}

function Content({data}){
    switch(data.game.toString()){
        case "65d24331cd060c516439d182":
            return <Minesweeper room={data}></Minesweeper>;
        default:
            throw new Error("That game doesn't exist");
    }
}