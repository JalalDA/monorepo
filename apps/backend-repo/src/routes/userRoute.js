"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const api_1 = require("../controllers/api");
const userRouter = express_1.default.Router();
userRouter.get("/fetch-user-data", authMiddleware_1.authMiddleware, api_1.fetchUserData);
userRouter.post("/update-user-data", authMiddleware_1.authMiddleware, api_1.updateUserDataHandler);
userRouter.post(`/create-user-data`, api_1.createUserDataHandler);
exports.default = userRouter;
