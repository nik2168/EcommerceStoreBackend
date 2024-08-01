import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.SECRETKEY);

    return res
      .status(201)
      .json({ success: true, user: { token, data: newUser }, message: "SignUp Successfully !" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while signing Up the User" });
  }
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username }).select("+password");

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect !" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);

    return res.status(200).json({ success: true, user: { token, data: user }, message: "login successfully !" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while logging in the User" });
  }
};
