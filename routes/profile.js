const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../utils/wrapasync");
const UserController = require("../controllers/profile");

router.post("/edits/:id", wrapasync(UserController.updateProfilePic));
module.exports = router;
