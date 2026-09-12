import express from "express";
const app = express();
import cors from "cors";
import { authorController } from "./modules/author/index.js";
import { connectDB } from "./DB/db.js";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import { PORT } from "./config.js";
import { userController } from "./modules/user/index.js";
import { noteController } from "./modules/note/index.js";

//DB connection
connectDB(app, PORT);
//level-middleware
app.use(cors(), express.json());
//routing
app.get("/", async (req, res, next) => {
  return res.json({ message: "welcome to my API" });
});

app.use(authorController);  
app.use(userController);     
app.use(noteController);     

app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "Invalid application routing" });
});
app.use(globalErrorHandling);
