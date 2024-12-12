const Attendance = require("../../models//Attendance");

module.exports.viewAttendanceData = async (req, res) => {
  // Fetch attendance records from the database
  const attendanceRecords = await Attendance.find().populate("userId");

  res.render("User/admin/attendance", {
    attendanceRecords: attendanceRecords,
  });

  console.error(err);
  req.flash("error", "An error occurred while fetching attendance records.");
  res.redirect("/admin/dashboard");
};

module.exports.updateattendance = async (req, res) => {
  const { status } = req.body; // Get updated status from the request body
  const attendanceId = req.params.id; // Get the attendance record ID from the URL params

  // Update attendance record by ID
  const updatedAttendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    { status: status }, // The status to be updated
    { new: true } // Ensures the updated document is returned
  );

  if (!updatedAttendance) {
    // If the attendance record is not found, render the error page
    return res.render("error", { error: "Attendance record not found" });
  }
  // Successful update, redirect or send success message
  req.flash("success", "Attendance updated successfully");
  res.redirect("/admin/attendance");
};

module.exports.deleteAttendance = async (req, res) => {
  const attendanceId = req.params.id;

  const deletedRecord = await Attendance.findByIdAndDelete(attendanceId);

  if (!deletedRecord) {
    return res.render("error", { error: "Attendance record not found" });
  }

  req.flash("success", "Attendance record deleted successfully");
  res.redirect("/admin/attendance");
};

module.exports.addNewAttendance = async (req, res) => {
  const { userId, date, status } = req.body;

  // Validate required fields
  if (!userId || !date || !status) {
    return res.render("error", {
      error: "All fields are required to add attendance.",
    });
  }

  // Create a new attendance record
  const newAttendance = new Attendance({
    userId,
    date,
    status,
  });

  const addedAttendance = await newAttendance.save();

  if (!addedAttendance) {
    return res.render("error", {
      error: "Failed to add new attendance record.",
    });
  }

  // Set success message and redirect
  req.flash("success", "Attendance record added successfully.");
  res.redirect("/admin/attendance");
};

module.exports.generateReport = async (req, res) => {
  const { fromDate, toDate } = req.query;

  // Validate query parameters
  if (!fromDate || !toDate) {
    return res.render("error", {
      error: "Both 'From Date' and 'To Date' are required.",
    });
  }

  // Parse the dates to ensure proper comparison
  const from = new Date(fromDate);
  const to = new Date(toDate);

  // Ensure 'to' includes the full day (end of day)
  to.setUTCHours(23, 59, 59, 999);

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return res.render("error", { error: "Invalid date format provided." });
  }

  // Query the database for attendance records within the range
  const attendanceRecords = await Attendance.find({
    date: { $gte: from, $lte: to },
  }).populate("userId");

  if (!attendanceRecords.length) {
    req.flash(
      "error",
      "No attendance records found for the selected date range."
    );
    return res.redirect("/admin/attendance");
  }

  // Render the attendance records on the report page
  res.render("User/admin/attendanceReport", {
    attendanceRecords,
    fromDate,
    toDate,
  });
};
