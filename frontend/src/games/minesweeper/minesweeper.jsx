import { useCallback, useEffect, useState } from "react"
import React from "react";

export default function Minesweeper({room}){
    
    const [flags, setFlags] = useState(40);
    const [isInitialize, setIsInitialize] = useState(false);

    function initializeGame(){
        if(!isInitialize){
            setIsInitialize(true);
        }
    }

    function finishGame(response){
        setIsInitialize(false);
        setTimeout(() => {

        }, 1000)
    }

    return(
        <>
            <section className="bg-green-800 py-8">
                <div className="flex justify-center gap-20 mb-6">
                    <Timer initialize={isInitialize}></Timer>
                    <span className="text-4xl">1 {flags}</span>
                </div>
                <Board setFlags={setFlags} initialize={initializeGame} roomId={room._id} finishGame={finishGame}></Board>
            </section>
        </>
    )
}

const Board = React.memo(({setFlags, initialize, roomId, finishGame}) => {
    
    const [board, setBoard] = useState(new Array(14 * 18).fill({isDigged: false, isFlagged: false, type: null}));

    async function dig(index){
        const line = Math.trunc(index/14);
        const column = index - line * 14;
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/rooms/${roomId}`, {
            method: "PUT",
            headers:{
                "Authorization": "BEARER " + localStorage.getItem("credentials"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({action: {line, column, type: "dig"}}),
        });
        response = await response.json();
        console.log(response);
        let newBoard = [...board];
        if(response.status.isFinished){
            newBoard = [];
            response.result.board.forEach((line) => {
                newBoard = newBoard.concat(line);
            })
            setBoard(newBoard);
            finishGame(response);
        }else{
            response.result.forEach((diggedCell) => {
                let cellIndex = diggedCell.line * 14 + diggedCell.column;
                newBoard.splice(cellIndex, 1, {isDigged: true, isFlagged: false, type: diggedCell.type});
            });
            setBoard(newBoard);
        }
    }

    async function flag(index){
        const line = Math.trunc(index/14);
        const column = index - line * 14;
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/rooms/${roomId}`, {
            method: "PUT",
            headers:{
                "Authorization": "BEARER " + localStorage.getItem("credentials"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({action: {line, column, type: "flag"}}),
        });
        response = await response.json();
        setFlags(response.result.flags);
        let newBoard = [...board];
        newBoard.splice(index, 1, {isDigged: false, isFlagged: response.result.isFlagged, type: null});
        setBoard(newBoard);
    }

    return(
        <div className="mx-auto grid grid-cols-14 gap-[1px] max-w-xl sm:px-3" onClick={initialize}>
            {board.map((cell, index) => 
                <>
                    <Cell isDigged={cell.isDigged} isFlagged={cell.isFlagged} type={cell.type} key={index} index={index} dig={dig} flag={flag}></Cell>
                </>
            )}
        </div>
    )
});

const Cell = React.memo(({isDigged, isFlagged, type, index, dig, flag}) => {

    function handleClick(){
        if(isFlagged) return;
        dig(index);
    }

    function handleSecondClick(event){
        event.preventDefault();
        flag(index);
    }

    return(
        <div className={`aspect-square ${(isDigged) ? "bg-orange-800" : (isFlagged) ? "bg-red-500" : "bg-green-500"}`} onClick={handleClick} onContextMenu={handleSecondClick}>{(type == "empty" || !type) ? null : type}</div>
    )
})

function Timer({initialize = true}){

    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId = null;
        if(initialize){
            intervalId = setInterval(() => {
                setTime(time + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId)
    }, [initialize, time]);

    function formatTime(){
        let hours = Math.trunc(time / 3600);
        let minutes = Math.trunc((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;
        return `${(hours < 10) ? "0" + hours : hours}:${(minutes < 10) ? "0" + minutes : minutes}:${(seconds < 10) ? "0" + seconds : seconds}`;
    }

    return(
        <>
            <span className="text-4xl">{formatTime()}</span>
        </>
    )
}