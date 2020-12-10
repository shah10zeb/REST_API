import express from "express";
const router = express.Router();

import {
  addTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controller/taskController.js";

router.post("/", addTask);

router.patch("/:taskID/", updateTask);

router.delete("/:taskID", deleteTask);

router.get("/", getTask);

export default router;
