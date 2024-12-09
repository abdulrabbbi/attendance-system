module.exports.isloggin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save the original URL to the session
    req.flash("error", "Access denied. Please log in to proceed");
    return res.redirect("/login");
  }
  next(); // Proceed to the next middleware if authenticated
};
// Middleware to save the original URL
const saveOriginalURL = (req, res, next) => {
  
  res.render(req.user.role == "admin" ? "User/adminDashbord" : "User/dashbord");
  
  next();
};

module.exports = { saveOriginalURL };
