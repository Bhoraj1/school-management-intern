import db from "../config/dbconnect.js";

export const addTeacher = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    // Check first email
    const [existing] = await db.execute(
      "SELECT id FROM teachers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Email already exists. Use another email.",
      });
    }

    // Insert Teacher
    await db.execute(
      "INSERT INTO teachers(name,email,phone,position) VALUES(?,?,?,?)",
      [name, email, phone, position]
    );

    return res.status(201).json({
      message: "Teacher added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const [result] = await db.execute("SELECT * FROM teachers");

    res.status(200).json({
      message: "All Teachers",
      teachers: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTeacher = async (req, res) => {
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
    console.log(error);
  }
};
