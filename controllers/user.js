const User = require("../models/user");

module.exports.RenderForm = (req, res) => {
  res.render("User/register.ejs");
};
const { promisify } = require("util"); // Required for async/await with req.login

module.exports.uploadFormData = async (req, res, next) => {
  try {
    const { name, email, password, profilePicture, grade, role } = req.body;

    // Create a new user instance
    let newUser = new User({
      name,
      email,
      profilePicture,
      grade,
      role,
    });

    // Register the user with a hashed password
    const user = await User.register(newUser, password);

    // Log the new user details
    if (user.role == "admin") {
      res.render("User/adminDashbord.ejs", { user });
    }

    // Use `req.login` to log the user in
    const login = promisify(req.login.bind(req)); // Convert req.login to promise
    await login(user);

    // Render the dashboard for the logged-in user
    res.render("User/dashbord.ejs", { user });
  } catch (err) {
    req.flash("error", err.message); // Flash error message
    res.redirect("/register"); // Redirect back to the signup form
  }
};

module.exports.renderIndex = async (req, res) => {
  let users = await User.find();
  res.render("User/index.ejs", { users });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let user = await User.findOne({ _id: id });
  res.render("User/edit.ejs", { user });
};

module.exports.uploadEditData = async (req, res) => {
  let { id } = req.params;
  let user = req.body;
  await User.findOneAndUpdate(
    // save updated user in to database
    { _id: id },
    { ...user },
    { new: true }
  );
  res.redirect("/users");
};
