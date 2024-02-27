import { AppError } from "../utils/errors";
import minesweeper from "./Minesweeper/minesweeper";

export default function gameAction(game, gameData, action){
    let gameResponse = null;
    
    switch(game){
        case "Minesweeper":
            gameResponse = minesweeper(gameData, action);
            break;
        default:
            throw new AppError("That game does not exist");
    }

    return gameResponse;
}