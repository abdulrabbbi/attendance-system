const Attendance = require("../../models/Attendance");
const User = require("../../models/user");
module.exports.renderGradeManagment = async (req, res) => {
  const calculateGrade = (attendanceCount) => {
    if (attendanceCount >= 26) return "A";
    if (attendanceCount >= 20) return "B";
    if (attendanceCount >= 10) return "C";
    return "D";
  };

  const attendanceData = await Attendance.aggregate([
    {
      $group: {
        _id: "$userId",
        attendanceCount: {
          $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
        },
      },
    },
  ]);
  // Attach user info and calculate grades
  const userGrades = await Promise.all(
    attendanceData.map(async (record) => {
      const user = await User.findById(record._id);
      return {
        name: user.name,
        email: user.email,
        attendanceCount: record.attendanceCount,
        grade: calculateGrade(record.attendanceCount),
      };
    })
  );
  res.render("User/admin/adminGrades", { userGrades });
};
