module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // Handle errors during logout
    req.flash("success", "You have successfully logged out.");
    res.render("User/home.ejs"); // Redirect to main page after logout
  });
};
