import FetchingPage from "../components/fetchingPage";
import GameHero from "../components/gameHero";

export default function Instructions(){
    return(
        <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/games/:game`}>
            <Content></Content>
        </FetchingPage>
    )
}

function Content({data}){
    return(
        <>
            <GameHero game={data} subtitle={"Instructions"}></GameHero>
            <section className="max-w-3xl mx-auto pt-3 px-3">
            {
                data.instructions.map((element, index) => {
                    switch(element.type){
                        case "title":
                            return <h2 key={index} className="pb-3">{element.content}</h2>
                        case "paragraph":
                            return <p key={index} className="pb-3">{element.content}</p>
                        case "image":
                            return <img src={element.content} alt="" key={index} className="mx-auto py-3"/>
                    }
                })
            }
            </section>
        </>
    )
}