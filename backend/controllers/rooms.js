const gameAction = require("../games/gameAction");
const { ValidationError, AppError } = require("../utils/errors");
const db = require("../utils/mongo");

exports.getAllRooms = async (req, res) => {
    res.send(await db.getRooms());
}

exports.getRoom = async (req, res) => {
    let room = await db.getRoomById(req.params.roomId);
    checkUser(req, room);
    res.send(room);
}

exports.queuePetition = async (req, res) => {
    let game = await db.getGameById(req.body.gameId);
    if(game.mode == "utility" || game.mode == "singleplayer"){
        let room = await createSingleRoom(game, req.user.userId);
        res.send(room);
        return;
    }
    else if(game.mode == "onevone" || game.mode == "allvall"){
        putUserOnQueue(game, req.user.userId);
        res.send({message: "User put on queue"});
        return;
    }
    throw new AppError("That mode doesn't exists");
}

exports.makeAction = async (req, res) => {
    let room = await db.getRoomById(req.params.roomId);
    let gameResponse = gameAction(room.game, room.gameData ?? null, room.users,req.body.action);
    room.gameData = gameResponse.gameData;
    room.markModified("gameData");
    await room.save();
    res.send({result: gameResponse.result, status: {isFinished: gameResponse.gameData.isFinished, users: gameResponse.gameData.users}});
}

const createSingleRoom = async (game, userId) => {
    return await db.createRoom(game, [userId]);
}

const putUserOnQueue = async (game, userId) => {
    
}

const checkUser = async (req, room) => {
    if(!room.users.filter(data => data == req.user.userId) && !req.user.idAdmin) throw new ValidationError("You doesn't have access to this room");
}