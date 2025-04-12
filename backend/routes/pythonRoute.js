import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url"; // Needed for __dirname equivalent in ES modules
import islController from "../controllers/isl.js"; // Adjust the import path as necessary
const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

router.get("/run-python", islController);

export default router;