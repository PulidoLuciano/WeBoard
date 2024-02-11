const mongoose = require("mongoose");

const { Schema } = mongoose;

const instructionPartSchema = new Schema({
    type: {
        type: String,
        enum: ["title, paragraph, image"],
        require: true
    },
    content: {
        type: String,
    }
})

const gameSchema = new Schema({
    name: {
        type: String, 
        minLength: 2,
        maxLength: 30,
        required: true,
        trim: true
    },
    instructions: [instructionPartSchema],
    image: {
        type: String
    },
    mode: {
        type: String,
        enum: ["singleplayer", "onevone", "allvall", "utility"],
        required: true
    }
});

module.exports = mongoose.model("Game", gameSchema);