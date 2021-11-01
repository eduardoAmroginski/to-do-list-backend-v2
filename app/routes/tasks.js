import express from "express";
import withAuth from "../middlewares/auth.js";
import TasksController from "../controllers/TasksController.js";
let router = express.Router();

router.post("/create", withAuth, TasksController.post);

router.get("/search", withAuth, TasksController.search);

router.get("/:id", withAuth, TasksController.getById);

router.get("/", withAuth, TasksController.index);

router.put("/update/:id", withAuth, TasksController.update);

router.delete("/delete/:id", withAuth, TasksController.delete);

export default router;
