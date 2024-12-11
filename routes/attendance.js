const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../utils/wrapasync");
const UserController = require("../controllers/Attendance");

router.post("/attendance/mark", wrapasync(UserController.handleStudentAttendance));
module.exports = router;
