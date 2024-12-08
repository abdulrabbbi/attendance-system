const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  grade: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // Use "email" as the username field for login
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
