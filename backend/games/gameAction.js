const { AppError } = require("../utils/errors");
const minesweeper = require("./Minesweeper/minesweeper");

function gameAction(gameId, gameData, users, action){
    
    let gameResponse = null;

    switch(gameId.toString()){
        case "65d24331cd060c516439d182": //Minesweeper
            gameResponse = minesweeper(gameData, users, action);
            break;
        default:
            throw new AppError("That game does not exist");
    }

    return gameResponse;
}

module.exports = gameAction;