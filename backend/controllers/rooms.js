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
    }
    else if(game.mode == "onevone" || game.mode == "allvall"){
        putUserOnQueue(game, req.user.userId);
        res.send({message: "User put on queue"});
    }
    throw new AppError("That mode doesn't exists");
}

exports.makeAction = async (req, res) => {
    let room = await db.getRoomById(req.params.roomId);
    
}

const createSingleRoom = async (game, userId) => {
    return await db.createRoom(game, [userId]);
}

const putUserOnQueue = async (game, userId) => {
    
}

const checkUser = async (req, room) => {
    if(!room.users.filter(data => data.user == req.user.userId) && !req.user.idAdmin) throw new ValidationError("You doesn't have access to this room");
}