const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
