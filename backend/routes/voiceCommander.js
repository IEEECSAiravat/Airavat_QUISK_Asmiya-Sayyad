import express from "express";
import axios from "axios";
import dotenv from "dotenv";
 
dotenv.config();
 
const router = express.Router();
 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyD8qPRiFtUMPhSyAuryQjmTQqI0U1WGbeA";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
 
// System prompt to guide the model
const SYSTEM_PROMPT = `
You are a voice-based navigation assistant for a website.
 
Your task is to analyze user queries and determine the most appropriate page they intend to visit.
 
You can navigate users to the following pages based on their commands:
 
If the user says "dashboard", navigate to "/dashboard".
If the user mentions "courses" or "course", navigate to "/courses".
If the user mentions "roadmap", navigate to "/roadmap".
If the user says "job" or "jobs", navigate to "/jobs".
If the user says "community", also navigate to "/community".
If the user says "interview" or "interviews", navigate to "/interviews".
If the user says "marketing course" or "marketing data course", navigate to "/courses/marketing-data-course".
 
EXCEPTION: If you receive just one or two LETTERS containing "c" or "C" , then navigate to "/courses".
 
Response Format:
 
Respond only with a raw JSON object, without any additional text, markdown, or code blocks.
Your response must strictly follow this format:
{ "navigateTo": "PAGE_NAME" }
Example Inputs and Outputs:
 
User: Take me to the dashboard  
Response: { "navigateTo": "/" }
User: Show me courses  
Response: { "navigateTo": "/courses" }
User: I want to see my course progress  
Response: { "navigateTo": "/courses" }
User: What’s in my roadmap?  
Response: { "navigateTo": "/roadmap" }
User: Show me job listings  
Response: { "navigateTo": "/jobs" }
User: Is there a community?  
Response: { "navigateTo": "/community" }
User: Help me with interviews  
Response: { "navigateTo": "/interviews" }
User: Start the marketing data course  
Response: { "navigateTo": "/courses/marketing-data-course" }
User: Start marketing course  
Response: { "navigateTo": "/courses/marketing-data-course" }
If the user's request not match any known page, do not attempt to generate a random response. Instead, return:
{ "navigateTo": / }
 
Ensure that navigation intent is determined precisely based on the given instructions.
 
IMPORTANT: Respond ONLY with a raw JSON object with no markdown formatting, code blocks, or backticks.
Your response should be exactly in this format:
{ "navigateTo": "PAGE_NAME" }
 
`;
 
router.post("/process-query", async (req, res) => {
    try {
        const { userQuery } = req.body;
        if (!userQuery) return res.status(400).json({ error: "Query is required." });
 
        // Format the request for Gemini API
        const response = await axios.post(
            `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: SYSTEM_PROMPT },
                            { text: userQuery }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
                    topP: 0.8,
                    topK: 40
                }
            }
        );
 
        // Extract the response from Gemini
        let aiResponse = response.data.candidates[0].content.parts[0].text;
 
        try {
            // Clean the response if it contains markdown code blocks
            if (aiResponse.includes("```")) {
                // Extract content between code blocks if present
                const match = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (match && match[1]) {
                    aiResponse = match[1].trim();
                } else {
                    // Remove any backticks
                    aiResponse = aiResponse.replace(/```json|```/g, "").trim();
                }
            }
 
            // Parse the cleaned JSON response
            const parsedResponse = JSON.parse(aiResponse);
            return res.json(parsedResponse);
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            console.log("Raw AI response:", aiResponse);
 
            // Fallback: Try to extract the page name directly using regex
            const pageMatch = aiResponse.match(/"navigateTo"\s*:\s*"([^"]*)"/);
            if (pageMatch && pageMatch[1]) {
                return res.json({ navigateTo: pageMatch[1] });
            }
 
            // If all extraction attempts fail
            return res.json({ navigateTo: null, error: "Could not parse response" });
        }
    } catch (error) {
        console.error("Error processing query:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});
 
export default router;