import { exec } from 'child_process';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const JARVIS_API_URL = 'http://localhost:4000/api/voice/process-query'; 
 
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
 
            if (jsonLines.length === 0) throw new Error("No valid JSON output found");
 
            let mostCompleteOutput = [];
 
            for (const line of jsonLines) {
                try {
                    const parsed = JSON.parse(line.trim());
                    if (parsed && Array.isArray(parsed.predicted_characters)) {
                        if (parsed.predicted_characters.length > mostCompleteOutput.length) {
                            mostCompleteOutput = parsed.predicted_characters;
                        }
                    }
                } catch (e) {
                    continue;
                }
            }
 
            if (mostCompleteOutput.length === 0) {
                throw new Error("No valid predicted_characters found");
            }
 
            const joinedOutput = mostCompleteOutput.join('');
            console.log("Final joined output:", joinedOutput);
 
            if (!joinedOutput) {
                return res.json({ output: "", error: "No predicted characters found" });
            }
 
            try {
                // Navigation decision
                const jarvisResponse = await axios.post(JARVIS_API_URL, {
                    userQuery: joinedOutput
                });
                
                console.log("Full Jarvis response:", jarvisResponse.data);
                
                // Extract the navigation destination as a string
                let destination = null;
                
                // Handle different possible response structures from Jarvis API
                if (typeof jarvisResponse.data === 'string') {
                    destination = jarvisResponse.data;
                } else if (jarvisResponse.data && typeof jarvisResponse.data === 'object') {
                    // Try to extract destination from common response fields
                    destination = jarvisResponse.data.destination || 
                                 jarvisResponse.data.route || 
                                 jarvisResponse.data.path || 
                                 jarvisResponse.data.location ||
                                 jarvisResponse.data.page;
                    
                    // If still null but we have an object, try first string value
                    if (!destination) {
                        const values = Object.values(jarvisResponse.data);
                        for (const value of values) {
                            if (typeof value === 'string') {
                                destination = value;
                                break;
                            }
                        }
                    }
                }
                
                // Default to "dashboard" if no valid destination is found
                if (!destination || typeof destination !== 'string') {
                    console.warn("No valid destination found in Jarvis response, defaulting to dashboard");
                    destination = "dashboard";
                }
                
                console.log("Extracted destination:", destination);
                
                // Send a proper string response
                res.json({
                    output: joinedOutput,
                    navigateTo: destination
                });
                
            } catch (jarvisError) {
                console.error("Error communicating with Jarvis:", jarvisError);
                return res.json({ 
                    output: joinedOutput, 
                    navigateTo: "dashboard",  // Default fallback
                    error: "Failed to communicate with Jarvis API" 
                });
            }
 
        } catch (parseError) {
            console.error("Error parsing JSON output:", parseError);
            return res.status(500).json({ 
                error: parseError.message || "Invalid JSON output from Python script",
                navigateTo: "dashboard"  // Default fallback
            });
        }
    });
}