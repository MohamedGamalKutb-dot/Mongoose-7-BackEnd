import { Router } from "express";
import { successResponse } from '../../common/utils/response.utils.js'
import { deleteUser, getUser, update } from "./user.service.js";

const router = Router();


router.patch("/user/:userId", async (req, res,next) => {
    const data = await update(req.params,req.body);
    return successResponse({ res, status: 201, data });
});
router.delete("/user/:userId", async (req, res,next) => {
    const data = await deleteUser(req.params);
    return successResponse({ res, status: 201, data });
});


router.get("/user", async (req, res,next) => {
    const {id}=req.query;
  const data = await getUser(id);
  return successResponse({ res, status: 201, data });
});


export default router;