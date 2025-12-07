import db from "../config/dbconnect.js";
import { removeImg } from "../utils/removeImg.js";

export const addTeacher = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;

    if (!name || !email || !phone || !position) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check email exists
    const [existing] = await db.execute(
      "SELECT id FROM teachers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(409).json({
        message: "Email already exists. Use another email.",
      });
    }

    // Get image path if uploaded
    const imagePath = req.file
      ? `/uploads/teachers/${req.file.filename}`
      : null;

    // Insert Teacher with image
    await db.execute(
      "INSERT INTO teachers(name,email,phone,position,img) VALUES(?,?,?,?,?)",
      [name, email, phone, position, imagePath]
    );

    return res.status(201).json({
      message: "Teacher added successfully",
      imageUrl: imagePath,
    });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }
    next(error);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const [result] = await db.execute("SELECT * FROM teachers");

    res.status(200).json({
      message: "All Teachers",
      teachers: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute(
      "SELECT id, img FROM teachers WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        messages: `Teacher not found with this ${id}`,
      });
    }

    // Delete image if exists
    if (existing[0].img) {
      removeImg(`uploads/teachers/${existing[0].img.split("/").pop()}`);
    }

    await db.execute("DELETE FROM teachers WHERE id = ?", [id]);
    return res.status(200).json({
      message: `Teacher deleted successfully with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, position } = req.body;

    // Check if teacher exists
    const [existing] = await db.execute("SELECT * FROM teachers WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(404).json({
        message: `Teacher not found with id ${id}`,
      });
    }

    const teacher = existing[0];

    // Use existing values if not provided
    const updatedName = name || teacher.name;
    const updatedEmail = email || teacher.email;
    const updatedPhone = phone || teacher.phone;
    const updatedPosition = position || teacher.position;

    // Check if email already exists for another teacher
    if (email && email !== teacher.email) {
      const [emailCheck] = await db.execute(
        "SELECT id FROM teachers WHERE email = ? AND id != ?",
        [email, id]
      );

      if (emailCheck.length > 0) {
        if (req.file) {
          removeImg(req.file.path);
        }
        return res.status(409).json({
          message: "Email already exists. Use another email.",
        });
      }
    }

    // Handle image update
    let updatedImg = teacher.img;
    if (req.file) {
      updatedImg = `/uploads/teachers/${req.file.filename}`;

      if (teacher.img) {
        removeImg(`uploads/teachers/${teacher.img.split("/").pop()}`);
      }
    }

    // Update teacher
    await db.execute(
      "UPDATE teachers SET name = ?, email = ?, phone = ?, position = ?, img = ? WHERE id = ?",
      [updatedName, updatedEmail, updatedPhone, updatedPosition, updatedImg, id]
    );

    return res.status(200).json({
      message: "Teacher updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
