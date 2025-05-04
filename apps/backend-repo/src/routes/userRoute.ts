import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createUserDataHandler, fetchUserData, updateUserDataHandler } from "../controllers/api";

const userRouter = express.Router();

userRouter.get("/fetch-user-data", authMiddleware, fetchUserData);
userRouter.post("/update-user-data", authMiddleware, updateUserDataHandler as express.RequestHandler);
userRouter.post(`/create-user-data`, createUserDataHandler as express.RequestHandler);

export default userRouter;
