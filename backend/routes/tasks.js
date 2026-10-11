// A4: REST API endpoints for tasks
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// A5: turn the incoming value into a trimmed string
const cleanTitle = (value) => String(value ?? "").trim();

// GET /api/tasks - fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  const title = cleanTitle(req.body.title);
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 = created
  } catch (err) {
    res.status(500).json({ error: "Could not create task" });
  }
});

// PUT /api/tasks/:id - edit the title and/or mark complete/incomplete
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Task not found" });

  const updates = {};

  if (req.body.title !== undefined) {
    const title = cleanTitle(req.body.title);
    if (!title) return res.status(400).json({ error: "Title cannot be empty" });
    updates.title = title;
  }
  if (req.body.completed !== undefined) {
    updates.completed = Boolean(req.body.completed);
  }

  try {
    // { new: true } returns the updated document instead of the old one
    const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Could not update task" });
  }
});

// DELETE /api/tasks/:id - remove a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Task not found" });

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", id });
  } catch (err) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

module.exports = router;
