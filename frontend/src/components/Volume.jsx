import VolumeImage from "../assets/images/volume.svg"
import MuteImage from "../assets/images/mute.svg"
import { useEffect, useState } from "react"

export default function Volume({className}){
    
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        let storedVolume = localStorage.getItem("volume");
        if(storedVolume){
            setVolume(storedVolume);
        }     
        else{
            localStorage.setItem("volume", "0.5");
        }
        let muted = localStorage.getItem("muted");
        if(muted != null){
            setIsMuted((muted == "true"));
        }else{
            localStorage.setItem("muted", "false");
        }
    }, [])

    function changeVolume(event){
        setVolume(event.target.value);
        localStorage.setItem("volume", event.target.value);
    }

    function muteSounds(){
        setIsMuted(!isMuted);
        localStorage.setItem("muted", !isMuted);
    }

    return(
        <div className={`flex gap-2 items-center ${className}`}>
            <button className="hover:scale-105 transition-transform">
                {
                    (isMuted) ?
                        <img src={MuteImage} alt="Volume button" onClick={muteSounds}/>
                    :
                        <img src={VolumeImage} alt="Volume button" onClick={muteSounds}/>
                } 
            </button>
            <input type="range" name="volume" id="volume" className="w-1/2 md:w-full appearance-none h-2 bg-slate-700 rounded-2xl opacity-70 hover:opacity-100 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:bg-green-800 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:bg-green-800 [&::-moz-range-thumb]:rounded-full" min={0} max={1} step={0.1} value={volume} onChange={changeVolume}/>
            <p className="md:hidden">{volume * 100 + "%"}</p>
        </div>
    )
}