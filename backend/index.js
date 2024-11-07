import express from "express"; 
import "dotenv/config"
import workoutRoutes from "./routes/workouts.js";
import authRoutes from "./routes/auth.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import exerciseRoutes from "./routes/exercises.js";

const app = express();

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  }))
app.use(cookieParser())
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);


//default export for vercel
export default app;