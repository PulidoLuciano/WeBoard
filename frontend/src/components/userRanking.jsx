import useFetch from "../logic/hooks/useFetch";

export default function UserRanking({gameName}){
    
    const {data, loading, error} = useFetch(`http://${import.meta.env.VITE_BACKENDURL}/games/${gameName}/ranking/user`, {
        headers: {
            "Authorization": "BEARER " + localStorage.getItem("credentials"),
        }
    })
    
    return(
        <>
            {
                (loading)
                ?
                    <div className="flex gap-4 justify-center w-full bg-green-800 rounded-md py-4">
                        <p className="w-32 overflow-hidden text-white">Loading...</p>
                        <div className="border-b-2 border-dotted border-white w-1/3"></div>
                        <p className="text-right text-white">0000</p>
                    </div>
                :
                    (error)
                    ?
                        <div className="flex gap-4 justify-center w-full bg-green-800 rounded-md py-4">
                            <p className="w-32 overflow-hidden text-white">Error</p>
                            <div className="border-b-2 border-dotted border-white w-1/3"></div>
                            <p className="text-right text-white">0000</p>
                        </div>
                    :
                        (data.ranking)
                        ?
                            <div className="flex gap-4 justify-center w-full bg-green-800 rounded-md py-4">
                                <p className="w-32 overflow-hidden text-white">{`${data.ranking.position}. ${data.username}`}</p>
                                <div className="border-b-2 border-dotted border-white w-1/3"></div>
                                <p className="text-right text-white">{data.ranking.elo}</p>
                            </div>   
                        :
                            <div className="flex gap-4 justify-center w-full bg-green-800 rounded-md py-4">
                                <p className="overflow-hidden text-white">You didn't play this game before</p>
                            </div>   
            }
        </>
    )
}