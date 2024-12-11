const StuRequest = require("../models/StuRequest");

module.exports.handleLeaveRequest = async (req, res) => {
  const { date, reason } = req.body;
  const userId = req.user.id;

  try {
    // Convert dates into an array
    const dates = date.split(",").map((d) => new Date(d.trim()));

    // Save the leave request
    const leaveRequest = new StuRequest({
      userId,
      date: dates,
      reason,
    });

    await leaveRequest.save();
    req.flash("success", "your request is submitted sucessfully");
    res.redirect("/studentDashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error submitting leave request.");
  }
};
