import express from 'express';
// import { OpenAI } from 'openai';
const router = express.Router();
import genRoadmap from '../controllers/genRoadmap.js';
import genCourse from '../controllers/genCourse.js';

router.post('/generate', genRoadmap);
router.post('/generate-course',genCourse)
export default router;
