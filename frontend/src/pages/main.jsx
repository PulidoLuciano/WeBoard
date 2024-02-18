import GamesSection from "../components/gamesSection"

export default function MainPage({data}){
    return(
    <>
        <GamesSection title={"Singleplayer"} category={"singleplayer"} data={data}></GamesSection>
        <GamesSection title={"One vs. One"} category={"onevone"} data={data}></GamesSection>
        <GamesSection title={"All vs. All"} category={"allvall"} data={data}></GamesSection>
        <GamesSection title={"Utilities"} category={"utility"} data={data}></GamesSection>
    </>)
}