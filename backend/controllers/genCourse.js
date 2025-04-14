import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dotenv from 'dotenv';
// import * as fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 
dotenv.config();
 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBZuDWwC9QC6BortBUgRNN0Z_s23wxpCb4";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
 

export const generateCourse = async (req, res) => {
  try {
    const { title, level, goal, currentState } = req.body;
 
    // validate request body
    if (!title || !level || !goal || !currentState) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, level, goal, and currentState are required' 
      });
    }
 
    // course level
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(level.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid course level. Must be beginner, intermediate, or advanced' 
      });
    }
 
    const courseStructure = await genCourse(title, level, goal, currentState);
    
    return res.status(200).json(courseStructure);
 
  } catch (error) {
    console.error('Course generation error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate course', 
      message: error.message 
    });
  }
};
 
//  validate the parsed JSON structure
function validateCourseStructure(course) {
  // required top-level properties
  const requiredProps = ['courseTitle', 'courseLevel', 'courseGoal', 'modules'];
  for (const prop of requiredProps) {
    if (!course[prop]) {
      throw new Error(`Missing required property: ${prop}`);
    }
  }
  
  // validate modules
  if (!Array.isArray(course.modules) || course.modules.length === 0) {
    throw new Error('Modules must be a non-empty array');
  }
  
  // validate each module
  for (const module of course.modules) {
    if (!module.moduleId || !module.moduleTitle || !module.moduleDescription) {
      throw new Error(`Module ${module.moduleId || 'unknown'} is missing required properties`);
    }
    
    if (!Array.isArray(module.subsections) || module.subsections.length === 0) {
      throw new Error(`Module ${module.moduleId} has no subsections`);
    }
    
    // validate each subsection
    for (const subsection of module.subsections) {
      if (!subsection.subsectionId || !subsection.subsectionTitle || !subsection.content) {
        throw new Error(`Subsection in module ${module.moduleId} is missing required properties`);
      }
    }
  }
  
  return true; //valid passed
}

// generate course structure 
async function genCourse(courseTitle, courseLevel, courseGoal, userCurrentState) {
  try {
    
    const prompt = `
You are an expert course creator tasked with designing a comprehensive ${courseLevel} level course titled "${courseTitle}".
 
USER INFORMATION:
- Goal: ${courseGoal}
- Current knowledge/state: ${userCurrentState}
 
INSTRUCTIONS:
Create a well-structured course with 4 to 8 modules as necessary. Each module should have 3 to 5 subsections as necessary. If relevant , then try to include practical exercises or challenges or assignment or real world projects in the last module . 
You must respond ONLY with a valid, parseable JSON object exactly matching the following structure:
 
{
  "courseTitle": "${courseTitle}",
  "courseLevel": "${courseLevel}",
  "courseGoal": "${courseGoal}",
  "modules": [
    {
      "moduleId": 1,
      "moduleTitle": "Module Title",
      "moduleDescription": "A concise description of what this module covers",
      "subsections": [
        {
          "subsectionId": 1,
          "subsectionTitle": "Clear and specific subsection title",
          "content": "Detailed educational content in markdown format. Include examples, explanations, and practical applications. Minimum 300 words per subsection."
        }
      ]
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Return ONLY the raw JSON with NO additional text, explanations, code blocks, or preamble
2. Ensure the JSON is completely valid and can be parsed with JSON.parse()
3. Do not include any markdown formatting syntax like \`\`\`json or \`\`\`
4. Output should start with { and end with } with nothing before or after
5. Use double quotes for JSON properties, not single quotes
6. Escape any quotes within strings properly with backslash

Each subsection title should be specific and searchable (good for finding relevant YouTube videos).
Ensure logical progression of topics from basic to advanced within the course.
Include practical exercises or challenges where appropriate.
Maintain consistent depth across all subsections.
`;
 
    // llm
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let llmResponse = result.response.text();
 
    // clean
    llmResponse = llmResponse.replace(/```json|```/g, '').trim();
    
    // save LLM response to file
    // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    // const filename = path.join(__dirname, `course_${timestamp}.txt`);
    // await fs.writeFile(filename, llmResponse, 'utf8');
    // console.log(`LLM response saved to ${filename}`);
    
    // parse json
    let courseStructure;
    try {      
      // clean
      const cleanedResponse = llmResponse.replace(/^\uFEFF/, '').trim();
      
      try {
        courseStructure = JSON.parse(cleanedResponse);
        // console.log("Successfully parsed JSON");
      } catch (firstError) {
        console.error("Initial JSON parsing failed:", firstError.message);
        
        // try with regex extraction
        console.log("Attempting regex extraction...");
        const jsonMatch = cleanedResponse.match(/{[\s\S]*}/);
        if (jsonMatch) {
          try {
            courseStructure = JSON.parse(jsonMatch[0]);
            console.log("Successfully parsed JSON using regex extraction");
          } catch (innerError) {
            console.error("Regex extraction parsing failed:", innerError.message);
            
            // final attempt - repair JSON
            console.log("Attempting to repair JSON...");
            const repairAttempt = cleanedResponse
              .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') 
              .replace(/\\'/g, "'") 
              .replace(/\\"/g, '"'); 
            
            try {
              courseStructure = JSON.parse(repairAttempt);
              console.log("Successfully parsed JSON after repairs");
            } catch (lastError) {
              console.error("All JSON parsing attempts failed");
              // save problematic response to a file for inspection
              console.error("probelematic response:", llmResponse);
              // const errorFilename = path.join(__dirname, `error_response_${timestamp}.txt`);
              // await fs.writeFile(errorFilename, llmResponse, 'utf8');
              // console.error(`Problematic response saved to ${errorFilename}`);
              throw new Error("Failed to parse LLM response as JSON: " + lastError.message);
            }
          }
        } else {
          console.error("No JSON-like structure found in response");
          console.error("probelematic response _ 1:", llmResponse);
        
          // const errorFilename = path.join(__dirname, `error_response_${timestamp}.txt`);
          // await fs.writeFile(errorFilename, llmResponse, 'utf8');
          // console.error(`Problematic response saved to ${errorFilename}`);
          throw new Error("Failed to extract JSON from LLM response");
        }
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }

    // valisate stucture
    try {
      validateCourseStructure(courseStructure);
      // console.log("Course structure validation passed");
    } catch (validationError) {
      console.error("Course structure validation failed:", validationError.message);
      console.log("Attempting to repair malformed course structure...");
      courseStructure = await repairCourseStructure(llmResponse, courseTitle, courseLevel, courseGoal);
    }
 
    console.log("Course structure generated successfully");

    // enhance with YouTube videos
    const enhancedCourse = await addYouTubeVideos(courseStructure);
 
    return enhancedCourse;
  } catch (error) {
    console.error("Error generating course structure:", error);
    throw error;
  }
}
 
const youtubeApiKey = process.env.YOUTUBE_API_KEY || "AIzaSyDef9A9PC0gSiq6bQnIidN6FlXqG1_j_Wk";
 
if (!youtubeApiKey) {
  console.warn("Warning: YOUTUBE_API_KEY not set in environment variables.");
}
 
async function addYouTubeVideos(courseStructure) {
  const enhancedCourse = JSON.parse(JSON.stringify(courseStructure));
 
  for (const module of enhancedCourse.modules) {
    for (const subsection of module.subsections) {
      const searchQuery = `${enhancedCourse.courseTitle} ${module.moduleTitle} ${subsection.subsectionTitle}`;
 
      const searchOnYT = await getProperKeyword(searchQuery, subsection.subsectionTitle, module.moduleTitle, enhancedCourse.courseTitle);
 
      console.log(`Searching for YouTube video for: "${searchOnYT}"`);
      try {
        const videoId = await searchYouTubeVideo(searchOnYT, youtubeApiKey);
        subsection.youtubeVideoId = videoId;
      } catch (error) {
        console.error(`Error finding YouTube video for "${searchOnYT}":`, error);
        subsection.youtubeVideoId = null;
      }
    }
  }
 
  return enhancedCourse;
}
 
async function getProperKeyword(searchQuery, subsectionTitle, moduleTitle, courseTitle) {

  await new Promise(resolve => setTimeout(resolve, 2000)); //rate limit avoid
  try {
    const response = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" }).generateContent(`
      You are a YouTube SEO expert tasked with creating the most effective search query for educational content.
      
      CONTEXT:
      - Course title: "${courseTitle}"
      - Module title: "${moduleTitle}"
      - Subsection title: "${subsectionTitle}"
      - Original search query: "${searchQuery}"
      
      TASK:
      Generate a precise, concise YouTube search keyword that will find the most relevant tutorial or educational video for this topic.
      
      REQUIREMENTS:
      1. Focus primarily on the specific educational concept in the subsection title
      2. Include technical terms that YouTube creators would use in titles
      3. Use common search patterns that yield tutorial results (e.g., "how to", "tutorial", "explained")
      4. Limit to 3-5 words maximum for precision
      5. Prioritize searchability over completeness
      6. Consider what actual educational content creators would title their videos
      7. Avoid generic terms that would return overly broad results
      
      Respond ONLY with the exact search keyword phrase - no explanations, quotes, or additional text.
    `);
 
    const keyword = response.response.text().trim();
    console.log(`Generated keyword: "${keyword}" for subsection: "${subsectionTitle}"`);
    return keyword;
  } catch (error) {
    console.error("Error generating keyword:", error);
    return subsectionTitle; // Fallback
  }
}
 
 
async function searchYouTubeVideo(query, apiKey) {
  try {
    console.log(apiKey);
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: query,
        type: 'video',
        key: apiKey,
        // relevanceLanguage: 'en',
        videoEmbeddable: 'true',
        videoDuration: 'medium',
      }
    });
 
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].id.videoId;
    } else {
      throw new Error('No videos found');
    }
  } catch (error) {
    console.error('YouTube API error:', error?.response?.data || error.message);
    throw error;
  }
}

//repair if req
//repair and format malformed course structure
async function repairCourseStructure(rawResponse, courseTitle, courseLevel, courseGoal) {
  console.log("Attempting to repair and format malformed course structure...");
  
  try {
    // try to extract any useful information from the malformed response
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      You are a JSON repair expert. I have a malformed JSON response from an LLM that was supposed to 
      follow a specific course structure format but failed validation.
      
      Original raw response:
      ${rawResponse.substring(0, 5000)} ${rawResponse.length > 5000 ? '... (truncated)' : ''}
      
      Please convert this into a properly formatted JSON object with exactly this structure:
      {
        "courseTitle": "${courseTitle}",
        "courseLevel": "${courseLevel}",
        "courseGoal": "${courseGoal}",
        "modules": [
          {
            "moduleId": 1,
            "moduleTitle": "Module Title",
            "moduleDescription": "A concise description of what this module covers",
            "subsections": [
              {
                "subsectionId": 1,
                "subsectionTitle": "Clear and specific subsection title",
                "content": "Detailed educational content..."
              }
            ]
          }
        ]
      }
      
      CRITICAL REQUIREMENTS:
      1. Return ONLY the raw JSON with NO additional text, explanations, code blocks, or preamble
      2. Ensure the JSON is completely valid and can be parsed with JSON.parse()
      3. Do not include any markdown formatting syntax like \`\`\`json or \`\`\`
      4. Output should start with { and end with } with nothing before or after
      5. Use double quotes for JSON properties, not single quotes
      6. Escape any quotes within strings properly with backslash
      7. Salvage as much content as possible from the original response
      8. If some modules or subsections are missing or malformed, create coherent replacements
      9. Ensure all moduleId and subsectionId values are sequential integers starting from 1
      
      Respond ONLY with the fixed JSON - no explanations or additional text.
    `;
    
    const result = await model.generateContent(prompt);
    let repairedJson = result.response.text();
    
    // clean
    repairedJson = repairedJson.replace(/```json|```/g, '').trim();
    
    // try parse repaired json
    const courseStructure = JSON.parse(repairedJson);
    
    // validate
    validateCourseStructure(courseStructure);
    
    console.log("Successfully repaired and formatted course structure");
    return courseStructure;
    
  } catch (error) {
    console.error("Failed to repair course structure:", error);
    
    // last resort, minimal strucutre create
    console.log("Creating minimal valid course structure as fallback");
    return {
      "courseTitle": courseTitle,
      "courseLevel": courseLevel,
      "courseGoal": courseGoal,
      "modules": [
        {
          "moduleId": 1,
          "moduleTitle": "Introduction to " + courseTitle,
          "moduleDescription": "An introduction to the key concepts of " + courseTitle,
          "subsections": [
            {
              "subsectionId": 1,
              "subsectionTitle": "Getting Started with " + courseTitle,
              "content": "This section covers the basics of " + courseTitle + ". We'll explore the fundamental concepts and prepare you for more advanced topics in later modules."
            },
            {
              "subsectionId": 2,
              "subsectionTitle": "Core Principles of " + courseTitle,
              "content": "Understanding the core principles is essential for mastering " + courseTitle + ". This section provides a comprehensive overview of these principles and their practical applications."
            },
            {
              "subsectionId": 3,
              "subsectionTitle": "Practical Applications of " + courseTitle,
              "content": "In this section, we'll explore how to apply the concepts you've learned to real-world scenarios. You'll gain hands-on experience with " + courseTitle + " through practical exercises and examples."
            }
          ]
        }
      ]
    };
  }
}
 
export default generateCourse;