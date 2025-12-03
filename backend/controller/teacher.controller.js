import db from "../config/dbconnect.js";

export const addTeacher = async (req, res, next) => {
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
    });
  } catch (error) {
    next(error);
  }
};
