const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        minLength: [2, "Username length must be at least 2, got {VALUE}"],
        maxLength: [30, "Username length must be lower than 30, got {VALUE}"], 
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String, 
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
            },
            message: "{VALUE} doesn't seem an e-mail"
        },
        trim: true
    },
    password: {
        type: String,
        minLength: [5, "Password length must be at least 5, got {VALUE}"],
        maxLength: [30, "Password length must be lower than 30, got {VALUE}"]
    },
    photo: {
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);