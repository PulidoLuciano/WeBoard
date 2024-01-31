const db = require("./mongo");

exports.getAllUsers = async function(req, res){
    try{
        let limit = (req.query.limit) ? req.query.limit : 100;
        const users = await db.getRandomUsers(limit);
        res.json(users);
    }catch{
        res.send("error");
    }
}
exports.userData = async function(req, res){
    try{
        const user = await db.getUserById(req.params.userId);
        if(user)
            res.json(user);
        else
            throw new Error("Usuario no encontrado");
    }catch(err){
        res.send(err);
    }
}

exports.userProfile = async function(req, res){
    try{
        let userId = req.params.userId;
        var profile = {userData: null, rankings: []};
        const user = await db.getUserById(userId);
        profile.userData = user;
        const rankings = await db.getUserRankings(userId);
        console.log(rankings);
        for(let i = 0; i < rankings.length; i++){
            let game = await db.getGameById(rankings[i].gameId.toString());
            profile.rankings.push({game: game.name, elo: rankings[i].elo});
        }
        res.json(profile);
    }catch(err){
        console.log(err);
    }
}
