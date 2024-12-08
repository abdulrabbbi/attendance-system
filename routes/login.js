const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const passport = require("passport");

// Import middleware and controllers
const UserController = require("../controllers/login");

router
  .route("/login")
  .get(UserController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login", // Redirect back to login on failure
      failureFlash: true,        // Show flash messages for errors
    }),
    UserController.saveLoginData // Called if authentication succeeds
  );

// Logout Route
router.get("/logout", UserController.logoutUser); // Log out the user and redirect

module.exports = router;
