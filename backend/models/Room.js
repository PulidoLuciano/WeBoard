const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    score: {
        type: Number,
    },
    hasLoosed: {
        type: Boolean,
        default: false
    }
})

const roomSchema = new Schema({
    type: {
        type: String,
        enum: ["Private", "Public"],
    },
    password: {
        type: String,
        minLength: [5, "Password length must be at least 5, got {VALUE}"],
        maxLength: [30, "Password length must be lower than 30, got {VALUE}"],
    },
    initialTime:{
        type: Date,
    },
    users: [usersSchema]
});

module.exports = mongoose.model("Room", roomSchema);