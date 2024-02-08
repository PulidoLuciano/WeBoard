const mongoose = require("mongoose");
const {Schema} = mongoose;

const verifyTokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true} 
});

module.exports = mongoose.model("VerifyToken", verifyTokenSchema);