const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../utils/wrapasync");
const UserController = require("../controllers/StuRequest");

router.post("/leave/request", wrapasync(UserController.handleLeaveRequest));

module.exports = router;
