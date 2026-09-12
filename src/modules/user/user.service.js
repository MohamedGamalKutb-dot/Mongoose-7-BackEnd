import mongoose from "mongoose";
import { UserModel } from "../../DB/model/user.model.js";


export const update = async ({ userId }, {name,email,DOB}) => {
    const user = await UserModel.updateOne({
        _id: userId 
    },{
        $set:{
            name,email,DOB
        },
        $inc:{
            __v:1
        } 
    }
);
  return user;
};
export const deleteUser= async ({ userId }) => {
    const user = await UserModel.updateOne({_id: userId })
    return user;
};


export const getUser = async (inputs) => {
    console.log(inputs)
  const user = await UserModel.findById(inputs)
  return user;
};