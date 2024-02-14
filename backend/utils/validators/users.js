const {ValidationError} = require("../errors");
const validator = require("./validators");

exports.validateUser = (user) => {
    validateUserName(user.username);
    validateUserEmail(user.email);
    validateUserPassword(user.password);
}

exports.validateUserName = (username) => {
    if(!validator.validateRequired(username))
        throw new ValidationError("Username is required");
    if(!validator.validateMaxLength(username, 30))
        throw new ValidationError(`Username length must be lower than 30, got ${username.length}`);
    if(/[^A-Za-z0-9_-]/.test(username)) throw new ValidationError(`Username must have only letters, numbers, - and _`)
}

exports.validateUserEmail = (email) => {
    if(!validator.validateEmail(email))
        throw new ValidationError(`${email} is not an email`);
}

exports.validateUserPassword = (email) => {
    if(!validator.validateBetweenLength(email, 5, 30))
        throw new ValidationError(`The password length must be between 5 and 30, got ${email.length}`);
}