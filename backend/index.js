import express from "express"; 
import "dotenv/config"
import workoutRoutes from "./routes/workouts.js";
import authRoutes from "./routes/auth.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }))
app.use(cookieParser())
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);


export default app;