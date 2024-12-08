const express = require("express");
const router = express();
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapasync"); // Utility for async error handling





// register the user student or adim(teachers)
router.get("/register",wrapAsync(userController.RenderForm) );
router.post("/register",wrapAsync( userController.uploadFormData));

// reder data to indexroute
router.get("/users",wrapAsync( userController.renderIndex));

// edits the students
router.get("/edit/:id", wrapAsync(userController.renderEditForm));

router.post("/edit/:id",wrapAsync( userController.uploadEditData));


module.exports = router;