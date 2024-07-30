import express from "express";
import {
  loginController,
  registerController,
} from "../controller/authController.js";

const router = express.Router();
// register user
router.post("/register", registerController);
// login user
router.post("/login", loginController);

export default router;
