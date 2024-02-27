import { AppError } from "../../utils/errors";

export default function minesweeper(gameData, action){
    let sendData = null;
    if(!gameData){
        gameData = createNewGame(20, 24, 99, action);
    }
    if(!gameData.loose) sendData = processAction(gameData, action);
    return {gameData, sendData: sendData ?? gameData};
}

function processAction(gameData, action){
    switch(action.type){
        case "dig":
            return dig(action.line, action.column, gameData);
        case "flag":
            return flag(action.line, action.column, gameData);
        default:
            throw new AppError("This is not a valid action");
    }
}

function dig(line, column, gameData){
    if(gameData.board[line][column].isDigged) throw new AppError("The cell is digged already");
    gameData.board[line][column].isDigged = true;
    gameData.board[line][column].isFlagged = false;
    if(gameData.board[line][column].type == "bomb") return lose(gameData);
    let sendData = bombsAround(line, column, gameData.board);
    return sendData;
}

function bombsAround(line, column, board){
    if(board[i][j].type != "empty") return [];
    
    let count = 0;
    let cellsDigged = []
    for(let i = line - 1; i <= line + 1; i++){
        for(let j = column - 1; j <= column + 1; j++){
            if(board[i][j].type == "bomb") count++;
        }
    }
    
    if(!count){
        for(let i = line - 1; i <= line + 1; i++){
            for(let j = column - 1; j <= column + 1; j++){
                let digged = bombsAround(i, j, board);
                cellsDigged = cellsDigged + digged;
            }
        }
    }
    
    board[i][j].type = count.toString();
    cellsDigged.push(board[i][j]);
    return cellsDigged;
}

function lose(gameData){
    gameData.lose = true;
    gameData.finalTime = Date.now();
    gameData.board.map((line) => {
        line.map((cell) => {
            if(cell.type == "bomb") cell.isDigged = true;
        })
    });
    return gameData;
}

function flag(line, column, gameData){
    if(gameData.board[line][column].isDigged) throw new AppError("You can't put a flag on a digged cell");
    gameData.board[line][column].isFlagged = !gameData.board[line][column].isFlagged;
    if(gameData.board[line][column].isFlagged) gameData.flags++;
    else gameData.flags--;
}

function createNewGame(width, height, bombs, action){
    let board = new Array(height);
    board.forEach((line) => {
        let columns = new Array(width);
        columns.forEach((cell) => {
            cell = new Cell();
        })
        line.push(columns);
    });
    while(bombs > 0){
        let bombLine = Math.round(Math.random() * (height - 1));
        let bombColumn = Math.round(Math.random() * (width - 1));
        if((bombLine == action.line || bombColumn == action.column) && action.type == "dig") continue;
        if(board[bombLine][bombColumn].type == "bomb") continue;
        board[bombLine][bombColumn].type = "bomb";
        bombs--;
    }

    const gameData = {
        board,
        initialTime: Date.now(),
        finalTime: null,
        lose: false,
        flags: 0,
    }
    return gameData;
}

class Cell{
    constructor(type = "empty", isDigged = false, isFlagged = false){
        this.type = type;
        this.isDigged = isDigged;
        this.isFlagged = isFlagged;
    }
}