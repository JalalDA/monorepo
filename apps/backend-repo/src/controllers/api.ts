import { Request, Response } from "express";
import { createUserData, getPaginatedUserDocs, updateUserData } from "../repository/userCollection";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const uid = (req as any).user?.uid;
    if (uid) res.status(401).json({ message: "Unauthorized" });
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const user = await getPaginatedUserDocs(page, limit);
    if (!user) res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

export const updateUserDataHandler = async (req: Request, res: Response) => {
  try {
    const uid = (req as any).user?.uid;
    await updateUserData(uid, req.body);
    res.json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error });
  }
};

export const createUserDataHandler = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid;
    const data = await createUserData(uid, req.body);
    res.json({ message: "User data created successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error creating user data", error });
  }
};
