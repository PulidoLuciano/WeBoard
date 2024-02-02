const db = require("../utils/mongo");
const validator = require("../utils/validators/users");

exports.getAllUsers = async function(req, res){
    let limit = (req.query.limit) ? req.query.limit : 100;
    const users = await db.getRandomUsers(limit);
    res.json(users);
}

exports.userData = async function(req, res){
    const user = await db.getUserById(req.params.userId);
    res.json(user);
}

exports.userProfile = async function(req, res){
    let userId = req.params.userId;
    var profile = {userData: null, rankings: []};
    const user = await db.getUserById(userId);
    profile.userData = {username: user.username, photo: user.photo, protected: (user.password) ? true : false};
    const rankings = await db.getUserRankings(userId);
    for(let i = 0; i < rankings.length; i++){
        let game = await db.getGameById(rankings[i].gameId.toString());
        profile.rankings.push({game: game.name, elo: rankings[i].elo});
    }
    res.json(profile);
}

exports.accessUsername = async function(req, res){
    let username = req.body.username;
    username.trim();
    let user = await db.getUserByUsername(username);
    if(!user){
        validator.validateUserName(username);
        user = await db.createUser(username);
    }
    if(user.password)
        res.json({passwordRequired: true, username: user.username}); 
    else{
        logInCookie(user.username);
    }
}

exports.accessProtectedAccount = async function(req, res){
    logInCookie(req.username);
}

const logInCookie = (username) => {
    //TO DO ACCESS COOKIE FOR FRONTEND
}
