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
exports.userProfile = async function(req, res){
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
