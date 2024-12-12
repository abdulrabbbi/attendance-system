const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const wrapasync = require("../../utils/wrapasync");
const UserController = require("../../controllers/admin/leaveRequest");

router.get("/", wrapasync(UserController.renderpage));
router.post("/:id/approve", wrapasync(UserController.aprovingRequest));
router.post("/:id/reject", wrapasync(UserController.rejectingRequest));


module.exports = router;