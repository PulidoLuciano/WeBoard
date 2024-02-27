const { AppError } = require("../../utils/errors");

module.exports = function minesweeper(gameData, users,action){
    let result = null;
    if(!gameData){
        gameData = createNewGame(20, 24, 99, users,action);
    }
    if(!gameData.isFinished) result = processAction(gameData, action);
    let sendData = {result: result ?? gameData, gameData};
    return sendData;
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
    if(gameData.board[line][column].type == "bomb") return lose(gameData);
    let sendData = bombsAround(line, column, gameData.board);
    if(isWon(gameData)) sendData = won(gameData);
    return sendData;
}

function bombsAround(line, column, board){
    if(board[line][column].isDigged) return [];
    board[line][column].isDigged = true;
    board[line][column].isFlagged = false;

    let count = 0;
    let cellsDigged = []
    for(let i = line - 1; i <= line + 1; i++){
        if(i == -1 || i + 1 > board.length) continue;
        for(let j = column - 1; j <= column + 1; j++){
            if(j == -1 || j + 1 > board[0].length) continue;
            if(board[i][j].type == "bomb") count++;
        }
    }

    if(!count){
        for(let i = line - 1; i <= line + 1; i++){
            if(i == -1 || i + 1 > board.length) continue;
            for(let j = column - 1; j <= column + 1; j++){
                if(j == -1 || j + 1 > board[0].length) continue;
                if(i == line && j == column) continue;
                let digged = bombsAround(i, j, board);
                cellsDigged = cellsDigged.concat(digged);
            }
        }
    }
    
    board[line][column].type = count.toString();
    cellsDigged.push({line, column, type: board[line][column].type});
    return cellsDigged;
}

function isWon(gameData){
    let cellsRemain = [];
    gameData.board.forEach(line => {
        cellsRemain.concat(line.filter((cell) => cell.isDigged))
    });
    return (cellsRemain.length == gameData.bombs);
}

function won(gameData){
    gameData.isFinished = true;
    gameData.finalTime = Date.now();
    return gameData;
}

function lose(gameData){
    gameData.users[0].lose = true;
    gameData.isFinished = true;
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
    if(gameData.board[line][column].isFlagged) gameData.flags--;
    else gameData.flags++;
    return {flags: gameData.flags};
}

function createNewGame(width, height, bombs, users,action){
    let initialBombs = bombs;
    let board = new Array(height).fill([]);
    for(let i = 0; i < height; i++){
        let column = new Array(width);
        for(let j = 0; j < width; j++){
            column[j] = new Cell();
        }
        board[i] = column;
    }

    while(bombs > 0){
        let bombLine = Math.round(Math.random() * (height - 1));
        let bombColumn = Math.round(Math.random() * (width - 1));
        if((bombLine == action.line && bombColumn == action.column) && action.type == "dig") continue;
        if(board[bombLine][bombColumn].type == "bomb") continue;
        board[bombLine][bombColumn].type = "bomb";
        bombs--;
    }

    const gameData = {
        board,
        bombs: initialBombs,
        initialTime: Date.now(),
        finalTime: null,
        isFinished: false,
        users: users.map((user) => ({user, lose: false})),
        flags: initialBombs,
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