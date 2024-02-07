const User = require("../models/User");
const Game = require("../models/Game");
const Ranking = require("../models/Ranking");
const Room = require("../models/Room");

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

exports.createUser = async (username, password = null, email = null, photo = null) => {
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

//GAMES

exports.getGames = async () => {
    const games = await Game.find().exec();
    return games;
}

exports.getGameById = async (id) => {
    const game = await Game.findById(id).exec();
    return game;
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

//ROOMS

exports.getRooms = async () => {
    const rooms = await Room.find().exec();
    return rooms;
}

exports.getRoomById = async (id) => {
    const room = await Room.findById(id).exec();
    return room;
}