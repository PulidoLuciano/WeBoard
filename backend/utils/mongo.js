const User = require("../models/User");
const Game = require("../models/Game");
const Ranking = require("../models/Ranking");
const Room = require("../models/Room");
const VerifyToken = require("../models/VerifyToken");

//USERS

exports.getRandomUsers = async (quantity) => {
    const users = await User.find().limit(quantity).exec();
    return users;
}

exports.getUserById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({username: username});
    return user;
}

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({email: email});
    return user;
}

exports.createUser = async (username, password = null, email = null, photo = `http://${process.env.DOMAIN}/public/avatars/none.webp`) => {
    const user = new User({
        username: username,
        email: email,
        password: password,
        photo: photo
    });
    return await user.save();
}

exports.protectUser = async (id, email, password) => {
    const user = { email, password};
    return await User.findOneAndUpdate({_id: id}, user);
}

exports.verifyUser = async (userId, tokenId) => {
    const user = {verified: true};
    await VerifyToken.findByIdAndDelete(tokenId);
    return await User.findOneAndUpdate({_id: userId}, user);
}

exports.changePassword = async (userId, password) => {
    const user = {password};
    return await User.findOneAndUpdate({_id: userId}, user);
}

exports.changePhoto = async (userId, photoUrl) => {
    const user = {photo: photoUrl};
    return await User.findByIdAndUpdate(userId, user);
}

//GAMES

exports.getGames = async () => {
    const games = await Game.find().exec();
    return games;
}

exports.getGameById = async (id) => {
    const game = await Game.findById(id).exec();
    return game;
}

exports.getGame = async (name) => {
    const game = await Game.findOne({name: name}).exec();
    return game;
}

exports.getGamesByMode = async (mode) => {
    return await Game.find({mode: mode}).exec();
}

exports.createGame = async (game) => {
    const newGame = new Game(game);
    return await newGame.save();
}

exports.updateGame = async (id, updatedGame) => {
    return await Game.findByIdAndUpdate(id, updatedGame);
}

exports.deleteGame = async (id) => {
    return await Game.findByIdAndDelete(id);
}

//RANKINGS

exports.getRankingById = async (id) => {
    const ranking = await Ranking.findById(id).exec();
    return ranking;
}

exports.getUserRankings = async (id) => {
    const rankings = await Ranking.find({userId: {$eq: id}}).exec();
    return rankings; 
}

exports.getGameRankings = async (gameId) => {
    return await Ranking.find({gameId: {$eq: gameId}}).sort({elo: -1}).limit(100).exec();
}

exports.getUserGameRanking = async (userId, gameId) => {
    let elo = await Ranking.find({gameId: {$eq: gameId}, userId: {$eq: userId}}).exec();
    if(elo.length == 0) return null;
    elo = elo[0].elo
    let position = (await Ranking.find({elo: {$gt: elo}})).length + 1;
    let ranking = {
        elo,
        position,
    }
    return ranking;
}

//ROOMS

exports.getRooms = async () => {
    const rooms = await Room.find().exec();
    return rooms;
}

exports.getRoomById = async (id) => {
    const room = await Room.findById(id).exec();
    return room;
}

exports.createRoom = async (game, users, type = "public", password = null) => {
    const room = new Room({
        game: game._id,
        users: users.map(user => {return {user: user, score: 0, hasLoosed: false}}),
        type,
        password,
        initialTime: Date.now(),
    });
    return await room.save();
}

//VERIFY TOKEN

exports.createVerifyToken = async (token, userId) => {
    let verifyToken = new VerifyToken({
        token,
        userId
    });
    return await verifyToken.save();
}

exports.getVerifyTokenByUserId = async (userId) => {
    return await VerifyToken.findOne({userId: userId});
}

exports.getVerifyTokenById = async (id) => {
    return await VerifyToken.findById(id).exec();
}

exports.getVerifyToken = async (token) => {
    return await VerifyToken.findOne({token: token}).exec();
}