import Task from "../models/task.js";

class TasksController {
  async index(req, res) {
    try {
      let tasks = await Task.find({ author: req.user._id });
      res.json(tasks);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async search(req, res) {
    const { query } = req.query;
    const user = req.user;
    try {
      let tasks = await Task.find({ author: user._id }).find({
        $text: { $search: query },
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;
      let task = await Task.findById(id);
      if (isOwner(user, task)) {
        res.json(task);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to get task" });
    }
  }

  async update(req, res) {
    const { title, description, done } = req.body;
    const { id } = req.params;
    const user = req.user;

    try {
      let task = await Task.findById(id);
      if (isOwner(user, task)) {
        let task = await Task.findOneAndUpdate(
          id,
          {
            $set: { title: title, description: description, done: done },
          },
          { upsert: true, new: true }
        );
        res.json(task);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to update task" });
    }
  }

  async post(req, res) {
    const { title, description, done } = req.body;

    try {
      let task = new Task({
        title: title,
        description: description,
        author: req.user._id,
        done: done,
      });
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Problem to create a new task" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = req.user;

    try {
      let task = await Task.findById(id);
      if (isOwner(user, task)) {
        await task.delete();
        res.json({ message: "Task was deleted" }).status(204);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to delete task" });
    }
  }
}

const isOwner = (user, task) => {
  if (JSON.stringify(user._id) == JSON.stringify(task.author._id)) return true;
  else return false;
};

export default new TasksController();
