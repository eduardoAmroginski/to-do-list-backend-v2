import express from "express";
import UsersController from "../controllers/UsersController.js";
let router = express.Router();

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

export default router;
