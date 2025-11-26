import db from "../config/dbconnect.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Login Api
export const login = async (req, res, next) => {
  try {
    //1. get email and password from user side.
    const { email, password } = req.body;

    //2.Simple Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    //3.Check user is available in database
    const [result] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = result[0];

    //User found?
    if (result.length === 0) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Check the foud user password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // jsonwebtoken
    const token = await jwt.sign(
      {
        //1 Your details
        id: user.id,
        name: user.name,
        email: user.email,
      },
      // 2.Secret key
      process.env.SECRET_KEY,
      {
        // 3.Expire time
        expiresIn: process.env.EXPIRE,
      }
    );

    // Storing Token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // 4. Success then return response
    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// signout APIs
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    next(error);
  }
};
