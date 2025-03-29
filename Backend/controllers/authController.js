import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role, age, mobile, gender } = req.body;

  let userModel;
  if (role === "admin") userModel = Admin;
  else if (role === "doctor") userModel = Doctor;
  else if (role === "patient") userModel = Patient;
  else return res.status(400).json({ message: "Invalid role" });

  const userExists = await userModel.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await userModel.create({ name, email, password, role, age, mobile, gender });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  let userModel;
  if (role === "admin") userModel = Admin;
  else if (role === "doctor") userModel = Doctor;
  else if (role === "patient") userModel = Patient;
  else return res.status(400).json({ message: "Invalid role" });

  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
