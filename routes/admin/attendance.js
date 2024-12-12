const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../../utils/wrapasync");
const UserController = require("../../controllers/admin/attendance");

router.get("/attendance", wrapasync(UserController.viewAttendanceData));
router.post("/attendance/edit/:id", wrapasync(UserController.updateattendance));
router.post(
  "/attendance/delete/:id",
  wrapasync(UserController.deleteAttendance)
);
router.post("/attendance/add", wrapasync(UserController.addNewAttendance));
router.get("/attendance/report", wrapasync(UserController.generateReport));
module.exports = router;
