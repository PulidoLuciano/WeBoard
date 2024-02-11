const db = require("../mongo");
const {ValidationError} = require("../errors");
const validator = require("./validators");

exports.validateGame = async (game) => {
    await validateGameName(game);
    validateGameMode(game);
}

validateGameName = async (game) => {
    game.name.trim();
    game.name.toLowerCase();
    if(!validator.validateRequired(game.name)) throw new ValidationError("Name is required");
    if(!validator.validateMaxLength(game.name, 30)) throw new ValidationError("Name length must be lower than 30");
}

validateGameMode = (game) => {
    game.mode.trim();
    game.mode.toLowerCase();
    if(!["singleplayer", "onevone", "allvall", "utility"].includes(game.mode))
        throw new ValidationError("There is not such mode");
}