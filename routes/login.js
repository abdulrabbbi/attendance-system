const express = require("express");
const router = express.Router(); // Use `Router()` for modular route handling
const passport = require("passport");
const UserController = require("../controllers/login");
const { saveOriginalURL } = require("../middlewares/middleware");
// console.log()
router.get("/login", (req, res) => {
  res.render("User/login.ejs");
});
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
  (req, res) => {
    console.log("Authenticated User:", req.user); // Check req.user object

    let user = req.user;
    if (req.user.role === "admin") {
      console.log("Redirecting to admin dashboard");
      return res.render("User/adminDashbord", { user });
    }
    console.log("Redirecting to student dashboard");
    res.render("User/dashbord", { user });
  }
);

// router
//   .route("/login")
//   .get(UserController.renderLoginForm)
//   .post(
//     passport.authenticate("local", {
//       failureRedirect: "/login", // Redirect back to login on failure
//       failureFlash: true,        // Show flash messages for errors
//     }),
//     UserController.saveLoginData // Called if authentication succeeds
//   );

// Logout Route
router.get("/logout", UserController.logoutUser); // Log out the user and redirect

module.exports = router;
