const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        minLength: [1, "Username length must be at least 1, got {VALUE}"],
        maxLength: [30, "Username length must be lower than 30, got {VALUE}"], 
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String, 
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || !v;
            },
            message: "{VALUE} doesn't seem an e-mail"
        },
        trim: true
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);