import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 21,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    comparePassword: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
