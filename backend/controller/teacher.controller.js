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
      "SELECT id FROM teachers WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        messages: `Teacher not found with this ${id}`,
      });
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
    const updateData = req.body;

    // Check if teacher exists
    const [existing] = await db.execute(
      "SELECT id FROM teachers WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Teacher not found with id ${id}`,
      });
    }

    // Check if email already exists for another teacher
    if (updateData.email) {
      const [emailCheck] = await db.execute(
        "SELECT id FROM teachers WHERE email = ? AND id != ?",
        [updateData.email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(409).json({
          message: "Email already exists. Use another email.",
        });
      }
    }

    // Add image path if new image uploaded
    if (req.file) {
      updateData.img = `/uploads/teachers/${req.file.filename}`;
    }

    // Build dynamic update query
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    values.push(id);

    // Update teacher
    await db.execute(`UPDATE teachers SET ${setClause} WHERE id = ?`, values);

    return res.status(200).json({
      message: "Teacher updated successfully",
      imageUrl: req.file ? `/uploads/teachers/${req.file.filename}` : null,
    });
  } catch (error) {
    next(error);
  }
};
