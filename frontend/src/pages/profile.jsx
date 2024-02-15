export default function Profile({data}){
    return(
        <>
            <section className="mx-auto max-w-5xl my-11 flex gap-9 items-center max-[768px]:flex-col max-[768px]:mx-0">
                <img src={data.userData.photo} alt="Profile photo" className="max-w-96 rounded-full max-[768px]:w-72"/>
                <h1 className="text-7xl">{data.userData.username}</h1>
            </section>
            <section className="mx-auto pb-6 max-w-5xl justify-center max-[768px]:p-3">
                <h2>Game's elos</h2>
                {
                    (data.ranking) ?
                    data.rankings.map((ranking) => 
                    <div className="flex gap-4">
                        <p className="w-32">{ranking.game}</p>
                        <div className="border-b-2 border-dotted border-gray-500 w-2/3"></div>
                        <p className="text-right">{ranking.elo}</p>
                    </div>
                    )
                    :
                    <p>There's not elos yet...</p>
                }
                <div className="flex gap-4 text-center">
                    <p className="w-32">Minesweeper</p>
                    <div className="border-b-2 border-dotted border-gray-500 w-2/3 max-[768px]:w-1/3"></div>
                    <p className="text-right">00:09:30</p>
                </div>
                <div className="flex gap-4 text-center">
                    <p className="w-32">Domino</p>
                    <div className="border-b-2 border-dotted border-gray-500 w-2/3 max-[768px]:w-1/3"></div>
                    <p className="text-right">2500</p>
                </div>
                <div className="flex gap-4 text-center">
                    <p className="w-32">Minesweeper</p>
                    <div className="border-b-2 border-dotted border-gray-500 w-2/3 max-[768px]:w-1/3"></div>
                    <p className="text-right">00:09:30</p>
                </div>
                <div className="flex gap-4 text-center">
                    <p className="w-32">Domino</p>
                    <div className="border-b-2 border-dotted border-gray-500 w-2/3 max-[768px]:w-1/3"></div>
                    <p className="text-right">2500</p>
                </div>
            </section>
        </>
    )
}