const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  excercises: [ExerciseSchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
