const StuRequest = require("../../models/StuRequest");

module.exports.renderpage = async (req, res) => {
  let leaveRequests = await StuRequest.find().populate("userId");
  res.render("User/admin/leaveRequest", { leaveRequests });
};

module.exports.aprovingRequest = async (req, res) => {
  const requestId = req.params.id;

  // Find the leave request by ID
  const leaveRequest = await StuRequest.findById(requestId);
  if (!leaveRequest) {
    req.flash("error", "Leave request not found.");
    return res.redirect("/admin/leaves");
  }

  // Update the status to "approved"
  leaveRequest.status = "approved";
  await leaveRequest.save();

  // Flash success message and redirect
  req.flash("success", "Leave request approved successfully.");
  res.redirect("/admin/leaves");
};

module.exports.rejectingRequest = async (req, res) => {
  const requestId = req.params.id;

  // Find the leave request by ID
  const leaveRequest = await StuRequest.findById(requestId);
  if (!leaveRequest) {
    req.flash("error", "Leave request not found.");
    return res.redirect("/admin/leaves");
  }

  // Update the status to "rejected"
  leaveRequest.status = "rejected";
  await leaveRequest.save();

  // Flash success message and redirect
  req.flash("success", "Leave request rejected successfully.");
  res.redirect("/admin/leaves");
};
    