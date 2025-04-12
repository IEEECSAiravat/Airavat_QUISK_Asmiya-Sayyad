import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pythonRoute from './routes/pythonRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/python', pythonRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));