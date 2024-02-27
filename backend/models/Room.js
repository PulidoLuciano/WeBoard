const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomSchema = new Schema({
    type: {
        type: String,
        enum: ["private", "public"],
    },
    password: {
        type: String,
        minLength: [5, "Password length must be at least 5, got {VALUE}"],
        maxLength: [30, "Password length must be lower than 30, got {VALUE}"],
    },
    initialTime:{
        type: Number,
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    game: {
        type: mongoose.Types.ObjectId,
        ref: "Game"
    },
    gameData: {} //mongoose doesn't detect changes in this field, you must use {schema}.markModified("gameData") before save
});

module.exports = mongoose.model("Room", roomSchema);