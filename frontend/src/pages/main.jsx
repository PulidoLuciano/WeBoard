import FetchingPage from "../components/fetchingPage"
import GamesSection from "../components/gamesSection"

export default function MainPage(){
    return(
    <>
        <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/games`}>
            <Content></Content>
        </FetchingPage>
    </>)
}

function Content({data}){
    return(
        <>
            <GamesSection title={"Singleplayer"} category={"singleplayer"} data={data}></GamesSection>
            <GamesSection title={"One vs. One"} category={"onevone"} data={data}></GamesSection>
            <GamesSection title={"All vs. All"} category={"allvall"} data={data}></GamesSection>
            <GamesSection title={"Utilities"} category={"utility"} data={data}></GamesSection>
        </>  
    )
}