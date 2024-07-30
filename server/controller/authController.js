import { comparePassword, hashPassword } from "../helper/authHelper.js";
import User from "../model/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, comparePassword } = req.body;
    // validation
    if (!name) {
      return res.rend({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!comparePassword) {
      return res.send({
        message: "Compare Password is Required",
      });
    }
    // check if password metch
    if (password !== comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Password do not match",
      });
    }
    // hashed Password
    const hashedPassword = await hashPassword(password);

    // exiting user in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(200).send({
        success: false,
        message: "User Already Register Please Login",
      });
    }

    // create new user
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      comparePassword: hashedPassword,
    }).save();
    // response here
    res.status(201).send({
      success: true,
      message: "User Create Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register Controller",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // check user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid User Email",
      });
    }

    // compare password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // response here in login
    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Controller",
      error,
    });
  }
};
