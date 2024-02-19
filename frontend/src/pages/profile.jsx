import FetchingPage from "../components/fetchingPage"

export default function Profile(){
    return(
        <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/users/:username/profile`}>
            <Content></Content>
        </FetchingPage>
    )
}

function Content({data}){
    return(
        <>
            <section className="mx-auto max-w-5xl my-11 flex gap-9 justify-center items-center max-[768px]:flex-col max-[768px]:mx-0">
                <img src={data.userData.photo} alt="Profile photo" className="max-w-96 max-h-96 rounded-full max-[768px]:w-72 max-[768px]:h-72"/>
                <h1 className="text-7xl max-[768px]:text-3xl">{data.userData.username}</h1>
            </section>
            <section className="mx-auto pb-6 max-w-5xl justify-center max-[768px]:p-3">
                <h2>Game's elos</h2>
                {
                    (data.ranking) ?
                    data.rankings.map((ranking) => 
                    <div className="flex gap-4 justify-center">
                        <p className="w-32">{ranking.game}</p>
                        <div className="border-b-2 border-dotted border-gray-500 w-2/3 max-[768px]:w-1/3"></div>
                        <p className="text-right">{ranking.elo}</p>
                    </div>
                    )
                    :
                    <p>There's not elos yet...</p>
                }
            </section>
        </>
    )
}