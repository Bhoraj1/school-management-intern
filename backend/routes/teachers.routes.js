import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeachers,
} from "../controller/teacher.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const teacherRouter = express.Router();
teacherRouter.post("/add-teacher", isLogin, addTeacher);
teacherRouter.get("/all-teachers", isLogin, getAllTeachers);
teacherRouter.delete("/delete-teacher/:id", isLogin, deleteTeacher);

export default teacherRouter;
