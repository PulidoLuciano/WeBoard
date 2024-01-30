const mongoose = require("mongoose");

const { Schema } = mongoose;

const rankingSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    gameId: {type: Schema.Types.ObjectId, ref: "Game", required: true},
    elo: {type: Number, min: 0}
});

module.exports = mongoose.model("Ranking", rankingSchema);