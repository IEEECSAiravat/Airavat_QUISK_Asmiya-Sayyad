import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
// import schemeRoutes from "./routes/scheme.js";
// import voiceCommanderRoutes from "./routes/voiceCommander.js";
import voiceCommander from './routes/voiceCommander.js';
// import pythonRoute from "./routes/pythonRoute.js"; 
// import connectDB from "./db/connect.js";
//  import ngrok from 'ngrok';
import roadmapRouter from "./routes/roadmap.js";
dotenv.config();
 
const app = express();
 
// connectDB()
//     .then(() => console.log("Database connected successfully"))
//     .catch((err) => {
//         console.error("Database connection failed:", err);
//         process.exit(1); // Exit if DB connection fails
//     });
 
// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
// app.use('/api/python', pythonRoute);
app.use('/api/voice', voiceCommander); 
// app.use("/api/voice", voiceCommanderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roadmap",roadmapRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
 

// ngrok.connect({ addr: 4000, authtoken_from_env: true })
// 	.then(listener => console.log(`Ingress established at: ${listener.url()}`));