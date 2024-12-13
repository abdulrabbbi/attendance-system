const User = require("../models/user");
const StuRequest = require("../models/StuRequest");

//render the admin dashbord
module.exports.renderAdminDashbord = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).render("error", { err: "user not found" });
  }
  if (user.role === "admin") {
    return res.render("User/adminDashbord", { user });
  } else {
    res.redirect("/login");
  }
};

// render student dashbord
module.exports.renderStuDashbord = async (req, res) => {
  try {
    let userId = req.user.id; // userId is already a string
    let leaveData = await StuRequest.findOne({ userId: userId }); // Fetch leave data
    console.log("Leave Data:", leaveData); // Debug log
    const user = await User.findById(userId); // Fetch user data

    if (!user) {
      return res.status(404).render("error", { err: "User not found" });
    }

    if (user.role === "student") {
      // Pass both user and leave data to the dashboard
      return res.render("User/dashbord", { user, leave: leaveData });
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", { err: "An error occurred" });
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
