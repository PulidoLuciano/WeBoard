export default function GameHero({game, subtitle}){
    return(
        <section className="relative w-full h-80">
            <img src={game.image} alt="Game's image" className="size-full"/>
            <div className="absolute flex flex-col justify-center top-0 left-0 size-full px-3 bg-slate-900 bg-opacity-30">
                <div className="w-full max-w-3xl mx-auto">
                    <h1 className="[text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">{game.name}</h1>
                    <h2 className="[text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)] text-[#dddddd]">{subtitle}</h2> 
                </div>
            </div>
        </section>
    )
}