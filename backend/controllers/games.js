const db = require("../utils/mongo");
const validator = require("../utils/validators/games");
const {ValidationError} = require("../utils/errors");
const path = require("path");
const fs = require("fs");

exports.getAllGames = async (req, res) => {
    let games = await db.getGames();
    res.send(games);
}

exports.getAllGamesByMode = async (req, res) => {
    let games = await db.getGamesByMode(req.params.mode);
    res.send(games);
}

exports.getGame = async (req, res) => {
    let name = (req.params.game);
    let game = await db.getGame(name);
    res.send(game);
}

exports.getGameRanking = async (req, res) => {
    let name = req.params.game;
    let game = await db.getGame(name);
    let ranking = await db.getGameRankings(game._id);
    let completeRanking = [];
    for(let element of ranking){
        let user = await db.getUserById(element.userId);
        completeRanking.push({id: element._id, username: user.username, elo: element.elo});
    }
    res.send({game, ranking: completeRanking});
}

exports.getUserRanking = async (req, res) => {
    let name = req.params.game;
    let game = await db.getGame(name);
    res.send({username: req.user.username, ranking: await db.getUserGameRanking(req.user.userId, game._id)});
}

exports.createGame = async (req, res) => {
    let game = {
        name: req.body.name,
        mode: req.body.mode,
        image: `http://${process.env.DOMAIN}/public/games/${req.file.filename}`,
        instructions: [],
    }
    await validator.validateGame(game);
    if(await db.getGame(game.name)) throw new ValidationError(`There is a game named ${game.name} already`);
    res.send(await db.createGame(game));
}

exports.updateGame = async (req, res) => {
    let game = {
        name: req.body.name,
        mode: req.body.mode,
        image: `http://localhost:3000/public/games/${req.file.filename}`,
        instructions: [],
    }
    await validator.validateGame(game);
    res.send(await db.updateGame(req.params.gameId, game));
}

exports.deleteGame = async (req, res) => {
    let game = await db.getGameById(req.params.gameId);
    let fileName = game.image.split("/");
    fileName = fileName[fileName.length - 1];
    let pathImage = path.normalize(__dirname + `/../images/games/${fileName}`);
    fs.rmSync(pathImage);
    res.send(await db.deleteGame(req.params.gameId));
}
