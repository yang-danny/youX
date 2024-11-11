import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connectDB";
import userRoute from "./routes/UserRoute";
import applicationRoute from "./routes/ApplicationRoute"
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/application", applicationRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port: ${PORT}`);
});