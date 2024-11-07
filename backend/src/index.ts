import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connectDB";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/test", async(req:Request, res:Response) => {
    res.json({message:"Hello!"})
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port: ${PORT}`);
});