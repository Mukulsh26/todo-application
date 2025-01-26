const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10, sortBy = "dueDate", sortOrder = "asc" } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query); 

    res.json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ error: "Due date cannot be in the past" });
    }

    const task = new Task({ title, description, status, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ error: "Due date cannot be in the past" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, dueDate },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
