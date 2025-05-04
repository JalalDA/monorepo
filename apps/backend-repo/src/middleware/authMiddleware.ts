import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await auth.verifyIdToken(token!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).json({ message: "Invalid token" });
  }
};
