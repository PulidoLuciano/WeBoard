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

router.post("/protect", auth, tryCatchFunction(controller.protectUsername));

module.exports = router;