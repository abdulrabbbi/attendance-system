const Attendance = require("../models/Attendance");


module.exports.handleStudentAttendance = async (req, res) => {
  const userid = req.user.id; // Assuming `req.user` contains authenticated user info
  try {
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    const attendanceExists = await Attendance.findOne({
      userId: userid,
      date: {
        $gte: new Date(today).setHours(0, 0, 0, 0),
        $lt: new Date(today).setHours(23, 59, 59, 999),
      },
    });
    if (attendanceExists) {
      req.flash("error", "You have already marked attendance today.");
      return res.redirect("/studentDashboard");
    }

    // Save attendance record
    const newAttendance = new Attendance({
      userId: userid,
      date: new Date(),
      status: "present",
    });
    await newAttendance.save();

    req.flash("success", "Attendance marked successfully!");
    res.redirect("/studentDashboard");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while marking attendance.");
    res.render("error.ejs");
  }
};
