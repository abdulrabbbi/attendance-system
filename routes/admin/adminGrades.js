const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../../utils/wrapasync");
const UserController = require("../../controllers/admin/adminGrades");

router.get("/grade", wrapasync(UserController.renderGradeManagment));

module.exports = router;