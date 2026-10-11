// A3: Mongoose schema/model for a Task
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },      // text of the task (required)
  completed: { type: Boolean, default: false }, // false until the user ticks it
  createdAt: { type: Date, default: Date.now }  // set automatically on creation
});

module.exports = mongoose.model("Task", taskSchema);
