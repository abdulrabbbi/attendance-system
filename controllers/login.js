const User = require("../models/user");

//render the admin dashbord
module.exports.renderAdminDashbord = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("User/adminDashbord", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// render student dashbord
module.exports.renderStuDashbord = async (req, res) => {
  console.log("user dashbord");
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("User/dashbord", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// for rendering the longin form
module.exports.renderLoginForm = (req, res) => {
  res.render("User/login.ejs");
};

// check the user and render to pages
module.exports.Checklogin = (req, res) => {
  if (!req.user) {
    return res.status(403).redirect("/login"); // Ensure req.user exists
  }

  if (req.user.role === "admin") {
    return res.redirect("/adminDashbord");
  }

  res.redirect("/studentDashboard");
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // Handle errors during logout
    req.flash("success", "You have successfully logged out.");
    res.render("User/home.ejs"); // Redirect to main page after logout
  });
};
