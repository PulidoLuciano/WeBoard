const express = require("express");
const controller = require("../controllers/games");
const {tryCatchFunction} = require("../utils/errors");
const {auth, authAdmin} = require("../utils/auth");
const {AppError} = require("../utils/errors");
const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, 'images/games');
        },
        filename: function (req, file, cb){
            var ext = path.extname(file.originalname);
            cb(null, req.body.name.trim() + ext);
        }
    }),
    fileFilter: function(req, file, cb){
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== ".webp") {
            return callback(new AppError('Only images are allowed'));
        }
        cb(null, true);
    },
});

const router = express.Router();

router.get("/", tryCatchFunction(controller.getAllGames));
router.get("/mode/:mode", tryCatchFunction(controller.getAllGamesByMode));
router.get("/:game", tryCatchFunction(controller.getGame));
router.get("/:game/ranking", tryCatchFunction(controller.getGameRanking));
router.get("/:game/ranking/user", auth,tryCatchFunction(controller.getUserRanking));
router.post("/", auth, authAdmin, upload.single("image"),tryCatchFunction(controller.createGame));
router.put("/:gameId", auth, authAdmin, upload.single("image"),tryCatchFunction(controller.updateGame));
router.delete("/:gameId", auth, authAdmin, tryCatchFunction(controller.deleteGame));

module.exports = router;
