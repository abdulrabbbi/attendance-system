module.exports.renderLoginForm = (req, res) => {
  res.render("User/login.ejs");
};
exports.saveLoginData = (req, res) => {
  let {username, role} = req.body;
  console.log("username",)
  console.log(req.user);
  if (req.user.role === "admin") {
    return res.render("User/adminDashbord");
  }
  res.render("User/dashbord.ejs");
  
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // Handle errors during logout
    req.flash("success", "You have successfully logged out.");
    res.render("User/home.ejs"); // Redirect to main page after logout
  });
};
