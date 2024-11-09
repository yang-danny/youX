import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connectDB";
import userRoute from "./routes/UserRoute";
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

// app.get("/test", async(req:Request, res:Response) => {
//     res.json({message:"Hello!"})
// })
app.use("/api/user", userRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port: ${PORT}`);
});