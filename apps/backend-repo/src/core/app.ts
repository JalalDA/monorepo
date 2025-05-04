import express, { Request, Response } from 'express';
import userRouter from '../routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);

app.get(`/user`, (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});