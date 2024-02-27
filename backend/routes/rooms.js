const express = require("express");
const {tryCatchFunction}  = require("../utils/errors");
const controller = require("../controllers/rooms");
const {auth, authAdmin} = require("../utils/auth");

const router = express.Router();

router.get("/:roomId", auth,tryCatchFunction(controller.getRoom));
router.get("/", auth, authAdmin,tryCatchFunction(controller.getAllRooms));
router.post("/", auth, tryCatchFunction(controller.queuePetition));
router.put("/:roomId", auth, tryCatchFunction(controller.makeAction));

module.exports = router;