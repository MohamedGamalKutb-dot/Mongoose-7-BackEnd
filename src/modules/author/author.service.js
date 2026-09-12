import mongoose from "mongoose";
import { UserModel } from "../../DB/model/user.model.js";

export const signup = async ({ name, email, password, DOB, phone, gender }) => {
  const user = await UserModel.create({
    name,
    email,
    password,
    DOB,
    phone,
    gender,
  });
  await user.save();
  return user;
};
export const login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email});
  if (user.password !== password) {
        throw new Error("Invalid email or password");
    }
  await user.save();
  return user;
};


