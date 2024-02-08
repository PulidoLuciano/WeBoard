const express = require("express");
const controller = require("../controllers/users");
const {tryCatchFunction} = require("../utils/errors");
const auth = require("../utils/auth");

const router = express.Router();

router.get("/", tryCatchFunction(controller.getAllUsers));

router.get("/:userId", tryCatchFunction(controller.userData));

router.get("/:userId/profile", tryCatchFunction(controller.userProfile));

router.post("/login", tryCatchFunction(controller.accessUsername));

router.post("/login-protected", tryCatchFunction(controller.accessProtectedAccount));

router.put("/protect", auth, tryCatchFunction(controller.protectUsername));

router.put("/verify", tryCatchFunction(controller.verifyUsername));

router.put("/recover", tryCatchFunction(controller.recoverAccount));

router.put("/password", auth,tryCatchFunction(controller.changePassword));

router.put("/photo", auth,tryCatchFunction(controller.changePhoto));

module.exports = router;