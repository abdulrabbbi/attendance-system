const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const passport = require("passport");
const UserController = require("../controllers/login");
const { saveOriginalURL, isloggin } = require("../middlewares/middleware");
const wrapasync = require("../utils/wrapasync");

router.get(
  "/adminDashbord",
  isloggin,
  wrapasync(UserController.renderAdminDashbord)
);
router.get(
  "/studentDashboard",
  isloggin,
  wrapasync(UserController.renderStuDashbord)
);

router.get("/login", wrapasync(UserController.renderLoginForm));
// Apply `saveOriginalURL` for GET requests to save the original page
router.get("/login", saveOriginalURL, (req, res) => {
  res.render("User/login"); // Render login page
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  UserController.Checklogin
);

// Logout Route
router.get("/logout", UserController.logoutUser); // Log out the user and redirect

module.exports = router;
