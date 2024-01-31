const express = require("express");
const controller = require("../controllers/users");

const router = express.Router();

router.get("/", controller.getAllUsers);

router.get("/:userId", controller.userData);

router.get("/:userId/profile", controller.userProfile);

module.exports = router;