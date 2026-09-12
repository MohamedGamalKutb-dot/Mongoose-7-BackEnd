import mongoose from "mongoose";
import { noteModel } from "../../DB/model/note.model.js";

export const create = async ({ title, content, userId }) => {
  const notes = await noteModel.create({ title, content, userId });
  return notes;
};

export const updateNote = async ({ notesId }, { title, content }) => {
  const notes = await noteModel.updateOne(
    {
      _id: notesId,
    },
    {
      $set: {
        title,
        content,
      },
      $inc: {
        __v: 1,
      },
    },
    {
      runValidators: true,
      returnDocument: "after",
    },
  );
  return notes;
};

export const replaceNote = async ({ noteId }, { title, content, userId }) => {
  const notes = noteModel.findOneAndReplace(
    {
      _id: noteId,
    },
    {
      title,
      content,
      userId,
    },
    {
      returnDocument: "after",
    },
  );
  return notes;
};

export const allUpdateNote = async ({ userId }, { title, content }) => {
  const notes = await noteModel.updateMany(
    {
      userId: userId,
    },
    {
      $set: {
        title,
        content,
      },
    },
    {
      runValidators: true,
      returnDocument: "after",
    },
  );
  return notes;
};

export const deleteNotes = async ({ notesId }) => {
  const user = await noteModel.deleteOne({ _id: notesId });
  return user;
};

export const retrievetLimit = async ({ userId, page = 1, limit = 3 }) => {
  const pageNotes = parseInt(page, 10);
  const limitNotes = parseInt(limit, 10);

  const skip = (pageNotes - 1) * limitNotes;
  const user = await noteModel
    .find({ userId: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNotes);
  return user;
};

export const gitByIdNotes = async ({ noteId }) => {
  const user = await noteModel.findById(noteId);
  return user;
};
export const noteByUserByEmail = async ({ userId }) => {
  //user Email اللي في الجدول التاني
  const user = await noteModel
    .find({ userId: userId })
    .select("title userId createdAt")
    .populate("userId", "email");
  return user;
};

export const aggregate = async ({ title, userId }) => {
  const matchQuery = {};

  if (userId) {
    matchQuery.userId = new mongoose.Types.ObjectId(userId);
  }

  if (title) {
    matchQuery.title = { $regex: title, $options: "i" };
  }
  const user = await noteModel.aggregate([
    {
      $match: matchQuery,
    },
    {
      $lookup: {
        from: "Users",
        localField: "userId",
        foreignField: "_id",
        as: "userforin",
      },
    },
    {
      $unwind: {
        path: "$userforin",
        preserveNullAndEmptyArrays: true, 
      },
    },

    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        "userforin.name": 1,
        "userforin.email": 1,
      },
    },
  ]);
  return user;
};
export const getUser = async (inputs) => {
  console.log(inputs);
  const user = await UserModel.findById(inputs);
  return user;
};


export const deleteall = async ({userId}) => {
  const user = await noteModel.deleteMany({ userId: userId });
  return user;
};
