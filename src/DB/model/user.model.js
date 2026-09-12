import mongoose from "mongoose";
import { GenderEnum } from "../../common/enum/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    DOB:{
      type:Number,
     min: [18, 'Age must be at least 18'], 
     max: [60, 'Age must be at most 60']
    },
     phone: {
      type: String,
      required: true,
      minLength: 11,
      
    },
    confirmEmailAt:Date,
    gender:{
      type: Number,
      enum:Object.values(GenderEnum),
      default: GenderEnum.MALE
    }
  },
  {
    timestamps: true,
    strict: false,
    autoIndex:true,
    strictQuery:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    optimisticConcurrency:true
  },
);

export const UserModel =mongoose.models.user|| mongoose.model("User", userSchema);
 