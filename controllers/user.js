import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "999d" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { username, password, confirmPassword, name, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "E-mail already registered" });
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    if (username.length < 6) {
      return res
        .status(400)
        .json({ message: "Username should have at least 6 characters" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should have at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      password: hashedPassword,
      name,
      email,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "999d" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
