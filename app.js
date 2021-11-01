import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import "./config/database.js";
import usersRouter from "./app/routes/users.js";
import tasksRouter from "./app/routes/tasks.js";

const PORT = process.env.PORT || 3400;

var app = express();

app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log("Server is Running at ", PORT);
});

export default app;
