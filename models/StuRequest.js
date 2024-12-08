const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StuRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  date: {
    type: [Date], // Array to support single or multiple leave dates
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },
});

const StuRequest = mongoose.model("StuRequest", StuRequestSchema);
module.exports = StuRequest;
