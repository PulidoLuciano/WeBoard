import GameHero from "../components/gameHero";
import UserRanking from "../components/userRanking";
import FetchingPage from "../components/fetchingPage";

export default function Ranking(){
    return(
        <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/games/:game/ranking`}>
            <Content></Content>
        </FetchingPage>
    )
}

function Content({data}){
    return(
        <>
            <GameHero game={data.game} subtitle={"Ranking"}></GameHero>
            {
                (localStorage.getItem("credentials"))
                ?
                    <section className="mt-3 px-3 max-w-3xl md:mx-auto">
                        <h2>Your ranking</h2>
                        <UserRanking gameName={data.game.name}></UserRanking>
                    </section>
                :
                    null
            }
            <section className="mt-3 px-3 max-w-3xl md:mx-auto">
                <h2>Top players</h2>
                {
                    data.ranking.map((player, index) => 
                        <div className="flex gap-4 justify-center w-full" key={player.id}>
                            <p className="w-32 overflow-hidden">{`${index+1}. ${player.username}`}</p>
                            <div className="border-b-2 border-dotted border-gray-500 w-1/3"></div>
                            <p className="text-right">{player.elo}</p>
                        </div>
                    )
                }
            </section>
        </>
    )
}