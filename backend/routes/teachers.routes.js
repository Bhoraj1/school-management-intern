import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { upload } from "../utils/multerHandler.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const teacherRouter = express.Router();
teacherRouter.post(
  "/add-teacher",
  isLogin,
  isAdmin,
  upload.single("image"),
  addTeacher
);

teacherRouter.get("/all-teachers", isLogin, getAllTeachers);
teacherRouter.delete("/delete-teacher/:id", isLogin, isAdmin, deleteTeacher);
teacherRouter.patch(
  "/update-teacher/:id",
  isLogin,
  upload.single("image"),
  updateTeacher
);

export default teacherRouter;
