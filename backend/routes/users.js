const express = require("express");
const controller = require("../controllers/users");
const {tryCatchFunction, AppError} = require("../utils/errors");
const {auth} = require("../utils/auth");
const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, 'images/avatars');
        },
        filename: function (req, file, cb){
            var ext = path.extname(file.originalname);
            cb(null, req.user.userId + ext);
        }
    }),
    fileFilter: function(req, file, cb){
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new AppError('Only images are allowed'));
        }
        cb(null, true);
    },
    limits:{
        fileSize: 2 * 1024 * 1024
    }
});

const router = express.Router();

router.get("/", tryCatchFunction(controller.getAllUsers));

router.get("/login", auth, tryCatchFunction(controller.getLoginData));

router.get("/:userId", tryCatchFunction(controller.userData));

router.get("/:username/profile", tryCatchFunction(controller.userProfile));

router.post("/login", tryCatchFunction(controller.accessUsername));

router.post("/login-protected", tryCatchFunction(controller.accessProtectedAccount));

router.put("/protect", auth, tryCatchFunction(controller.protectUsername));

router.put("/verify", tryCatchFunction(controller.verifyUsername));

router.put("/recover", tryCatchFunction(controller.recoverAccount));

router.put("/password", auth,tryCatchFunction(controller.changePassword));

router.put("/photo", auth, upload.single("profilePhoto"),tryCatchFunction(controller.changePhoto));

module.exports = router;