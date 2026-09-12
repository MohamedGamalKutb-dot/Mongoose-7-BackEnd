import { Router } from "express";
import { successResponse } from '../../common/utils/response.utils.js'
import { login, signup } from "./author.service.js";
const router = Router();


router.post("/signup", async (req, res,next) => {
  const data = await signup(req.body );
  return successResponse({ res, status: 201, data });
});
router.post("/login", async (req, res,next) => {
  const data = await login(req.body );
  return successResponse({ res, status: 201, data });
});



export default router;
