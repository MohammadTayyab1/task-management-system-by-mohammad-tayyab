const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task by ID
exports.getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};