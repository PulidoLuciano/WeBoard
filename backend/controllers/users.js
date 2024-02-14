const db = require("../utils/mongo");
const validator = require("../utils/validators/users");
const {AuthenticationError, AppError, ValidationError, NotFoundError} = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

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
    let username = req.body.username || "";
    username.trim();
    let user = await db.getUserByUsername(username);
    if(!user){
        validator.validateUserName(username);
        user = await db.createUser(username);
    }
    if(user.password)
        throw new AuthenticationError("Username is protected");
    else{
        logIn(user, res);
    }
}

exports.accessProtectedAccount = async function(req, res){
    let data = req.body;
    let user = await db.getUserByEmail(data.email);
    if(!user) throw new AuthenticationError("Email or password are not correct");
    let comparison = await bcrypt.compare(data.password, user.password);
    if(!comparison) throw new AuthenticationError("Email or password are not correct");
    if(!user.verified){
        let verifyToken = await db.getVerifyTokenByUserId(user._id);
        sendVerificationEmail(user.email, user.username, verifyToken.token);
        throw new AuthenticationError("The account it's not verified, please check your email");
    }
    logIn(user, res);
}

exports.protectUsername = async function(req, res){
    let user = await db.getUserById(req.user.userId);
    if(user.password) throw new AuthenticationError("The user is protected already");
    let email = req.body.email ?? "";
    email.trim();
    let password = req.body.password ?? "";
    let confirmPassword = req.body.confirmPassword ?? "";

    let userEmail = await db.getUserByEmail(email);
    if(userEmail) throw new AuthenticationError("The email is associated with another username");
    validator.validateUserEmail(email);
    validator.validateUserPassword(password);
    if(password != confirmPassword) throw new ValidationError("The passwords don't coincide");
    
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if(err) throw new AppError();
        await db.protectUser(user._id, email, hash);
    });
    
    let token = await bcrypt.hash(user.username + Math.random() * 10000,8);
    let verifyToken = await db.createVerifyToken(token, user._id);
    sendVerificationEmail(user.email, user.username, verifyToken.token);
   
    res.send({message: "Protection successful"});
}

exports.verifyUsername = async (req, res) => {
    let verifyToken = await db.getVerifyToken(req.query.token);
    if(!verifyToken) throw new AuthenticationError("Token doesn't exists");
    await db.verifyUser(verifyToken.userId, verifyToken._id);
    res.send({message: "User verified correctly"});
}

exports.recoverAccount = async (req, res) => {
    let user = await db.getUserByEmail(req.body.email);
    if(!user) throw new AuthenticationError("The email is not associated with any username");
    let newPassword = "randomPassword";
    bcrypt.hash(newPassword, 10, async (err, hash) => {
        if(err) throw new AppError();
        await db.changePassword(user._id, hash);
    });
    sendRecoverEmail(user.email, user.username, newPassword);
    res.send({message: "New password generated successfully", newPassword});
}

exports.changePassword = async (req, res) => {
    let user = await db.getUserById(req.user.userId);
    let oldPassword = req.body.oldPassword ?? "";
    let isEqual = bcrypt.compare(oldPassword, user.password);
    if(!isEqual) throw new AuthenticationError("The old password is not correct");
    let password = req.body.password ?? "";
    let confirmPassword = req.body.confirmPassword ?? "";
    validator.validateUserPassword(password);
    if(password != confirmPassword) throw new ValidationError("The passwords don't coincide");
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if(err) throw new AppError();
        await db.changePassword(user._id, hash);
    });
    res.send({message: "Password updated successfully"});
}

exports.changePhoto = async (req, res) => {
    let user = await db.getUserById(req.user.userId);
    let fileName = user.photo.split("/");
    fileName = fileName[fileName.length - 1];
    let pathImage = path.normalize(__dirname + `/../images/avatars/${fileName}`);
    fs.rmSync(pathImage);
    await db.changePhoto(req.user.userId, `http://localhost:3000/public/avatars/${req.file.filename}`);
    res.send({message: "Photo uploaded"});
}

exports.getLoginData = async (req, res) => {
    let user = await db.getUserById(req.user.userId);
    res.send(user);
}

const logIn = (user, res) => {
    let token = generateLogInToken(user._id, user.username, user.isAdmin);
    res.status(200).send({
        message: "Login successful",
        username: user.username,
        token
    })
}

const generateLogInToken = (userId, username, isAdmin) => {
    return jwt.sign({userId, username, isAdmin}, "Secret key");
}

const sendVerificationEmail = (userEmail, username, verifyToken) => {
    //TODO
}

const sendRecoverEmail = (userEmail, username, password) => {
    //TODO
}