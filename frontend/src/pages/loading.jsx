import Back from "../assets/cards/backcard.webp"
import Front from "../assets/cards/frontcard.webp"

export default function LoadingPage(){
    return(
        <>
            <section className="max-w-3xl mx-auto flex flex-col items-center pt-36">
                <div className="flex justify-center">
                    <LoadingCard></LoadingCard>
                </div>
                <div className="pt-7 flex">
                    <h1>Loading</h1>
                    <h1 className="animate-bounce ">.</h1>
                    <h1 className="animate-[bounce_1s_0.33s_infinite]">.</h1>
                    <h1 className="animate-[bounce_1s_0.66s_infinite]">.</h1>
                </div>          
            </section>
        </>
    )
}

function LoadingCard(){
    return(
        <>
            <div className={`relative h-[350px] w-[239px]`}>
                <img src={Back} alt="" className="absolute z-10"/>
                <img src={Back} alt="" className="absolute top-0 left-0 animate-card-pass"/>
            </div>   
        </>
    )
}