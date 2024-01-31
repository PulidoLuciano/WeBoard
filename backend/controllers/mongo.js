const User = require("../models/User");

exports.getRandomUsers = async (quantity) => {
    const users = await User.find().limit(quantity).exec();
    return users;
}

exports.getUserById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}