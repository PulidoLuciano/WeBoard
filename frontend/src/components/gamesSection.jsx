import GameCard from "./gameCard"

export default function GamesSection({category, title, data}){
    return(
        <section className="p-3 pb-6 max-w-3xl mx-auto xl:max-w-5xl">
            <h1 className="mb-2">{title}</h1>
            {
                (data.find(game => game.mode == category))
                ?
                <div className="grid gap-5 items-center justify-center md:grid-cols-2 xl:grid-cols-3">
                    {
                        data.filter(game => game.mode == category).map(game => <GameCard game={game} key={game._id}>{game.name}</GameCard>)
                    }
                </div>
                :
                <p>There're no games in this category yet</p>
            }
        </section>
    )
}