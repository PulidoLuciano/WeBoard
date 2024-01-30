const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
    name: {
        type: String, 
        minLength: 2,
        maxLength: 30,
        required: true,
        trim: true
    },
    instructions: {
        type: [String],
    },
    image: {
        type: String
    },
    mode: {
        type: String,
        enum: ["Singleplayer", "1v1", "AllvAll", "Utility"],
    }
});

module.exports = mongoose.model("Game", gameSchema);