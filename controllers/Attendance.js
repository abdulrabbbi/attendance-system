const Attendance = require("../models/Attendance");

module.exports.handleStudentAttendance = async (req, res) => {
  const userid = req.user.id; // Assuming `req.user` contains authenticated user info
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of the current day

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of the current day

    const attendanceExists = await Attendance.findOne({
      userId: userid,
      date: { $gte: startOfDay, $lt: endOfDay },
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
    res.status(500).render("error", { err: "An error occurred while marking attendance" });
  }
};
