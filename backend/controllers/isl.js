 
import { exec } from 'child_process';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
 
// Required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const GEMINI_API_KEY = 'AIzaSyDvWEkbsXi9_sfG9L_eGfl_vZVGFvPCOK0'; // Replace with your actual API key
 
export default async function islController(req, res) {
    console.log("Request received at /run-python endpoint");
 
    const pythonPath = path.resolve(__dirname, "../forisl/Scripts/python.exe");
    const scriptPath = path.resolve(__dirname, "../../islllll/jasonified.py");
 
    exec(`"${pythonPath}" "${scriptPath}"`, async (error, stdout, stderr) => {
        console.log("Raw stdout:", stdout);
 
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: "Error executing script" });
        }
 
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
        }
 
        try {
            // Find all valid JSON objects in the output
            const jsonLines = stdout.split("\n").filter(line => {
                try {
                    const trimmed = line.trim();
                    if (!trimmed) return false;
                    JSON.parse(trimmed);
                    return true;
                } catch {
                    return false;
                }
            });
 
            console.log("Filtered JSON:", jsonLines);
 
            if (jsonLines.length === 0) {
                throw new Error("No valid JSON output found");
            }
 
            // Find the line with the most complete predicted_characters array
            let mostCompleteOutput = [];
 
            for (const line of jsonLines) {
                try {
                    const parsed = JSON.parse(line.trim());
                    if (parsed && Array.isArray(parsed.predicted_characters)) {
                        // If this array is longer, it's more complete
                        if (parsed.predicted_characters.length > mostCompleteOutput.length) {
                            mostCompleteOutput = parsed.predicted_characters;
                        }
                    }
                } catch (e) {
                    console.error("Error parsing individual line:", e);
                    continue;
                }
            }
 
            if (mostCompleteOutput.length === 0) {
                throw new Error("No valid predicted_characters found");
            }
 
            console.log("Most complete predicted characters:", mostCompleteOutput);
 
            const joinedOutput = mostCompleteOutput.join('');
            console.log("Final joined output:", joinedOutput);
 
            // Only proceed with Gemini if we have actual content
            if (!joinedOutput) {
                return res.json({ output: "", error: "No predicted characters found" });
            }
 
            const geminiResponse = await sendToGemini(joinedOutput);
            console.log("Response from Gemini:", geminiResponse);
 
            res.json({ output: joinedOutput, geminiResponse });
 
        } catch (parseError) {
            console.error("Error parsing JSON output:", parseError);
            return res.status(500).json({ error: parseError.message || "Invalid JSON output from Python script" });
        }
    });
}
 
async function sendToGemini(message) {
    try {
        console.log("Sending to Gemini:", message);
 
        // Updated to use Gemini 2.0 Flash model
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [
                    {
                        parts: [
                            { text: message }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY  // Updated auth header format
                }
            }
        );
 
        // Safely extract the text from the response with proper error handling
        if (response.data && 
            response.data.candidates && 
            response.data.candidates[0] && 
            response.data.candidates[0].content && 
            response.data.candidates[0].content.parts && 
            response.data.candidates[0].content.parts[0]) {
            return { generatedText: response.data.candidates[0].content.parts[0].text || "" };
        } else {
            console.error('Unexpected Gemini API response structure:', response.data);
            return { error: 'Invalid response structure from Gemini API' };
        }
 
    } catch (error) {
        console.error('Error sending to Gemini:', error.response?.data || error.message);
        return { error: 'Failed to communicate with Gemini API' };
    }
}