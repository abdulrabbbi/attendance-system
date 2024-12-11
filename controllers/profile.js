const User = require("../models/user");

module.exports.updateProfilePic = async (req, res) => {
  let { id } = req.params;
  let { profilePicture } = req.body;
  await User.findOneAndUpdate(
    // save updated user in to database
    { _id: id },
    { profilePicture },
    { new: true }
  );
  res.redirect("/studentDashboard");
};
