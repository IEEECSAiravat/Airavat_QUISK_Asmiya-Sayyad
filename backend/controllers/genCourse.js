import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dotenv from 'dotenv';
 
dotenv.config();
 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBZuDWwC9QC6BortBUgRNN0Z_s23wxpCb4";
// Initialize Gemini API
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
 
// Course generation controller
export const generateCourse = async (req, res) => {
  try {
    const { title, level, goal, currentState } = req.body;
 
    // Validate request body
    if (!title || !level || !goal || !currentState) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, level, goal, and currentState are required' 
      });
    }
 
    // Validate course level
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(level.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid course level. Must be beginner, intermediate, or advanced' 
      });
    }
 
    // Generate course structure using Gemini
    const courseStructure = await genCourse(title, level, goal, currentState);
 
    // Return the enhanced course structure
    return res.status(200).json(courseStructure);
 
  } catch (error) {
    console.error('Course generation error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate course', 
      message: error.message 
    });
  }
};
 
// Function to generate course structure using Gemini 2.0 Flash
async function genCourse(courseTitle, courseLevel, courseGoal, userCurrentState) {
  try {
    // LLM prompt template
    const prompt = `
You are an expert course creator tasked with designing a comprehensive ${courseLevel} level course titled "${courseTitle}".
 
USER INFORMATION:
- Goal: ${courseGoal}
- Current knowledge/state: ${userCurrentState}
 
INSTRUCTIONS:
Create a well-structured course with 6-8 modules. Each module should have 3-5 subsections.
You must respond ONLY with a valid JSON object matching exactly the following structure, with NO additional text, explanations, or code formatting:
 
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
IMPORTANT GUIDELINES:
1. Each subsection title should be specific and searchable (good for finding relevant YouTube videos)
2. Ensure logical progression of topics from basic to advanced within the course
3. Include practical exercises or challenges where appropriate
4. Maintain consistent depth across all subsections
5. DO NOT use markdown code blocks "\`\`\`json" or any formatting - respond ONLY with the raw JSON.
6. Your response must be valid JSON only, with no additional text before or after.
`;
 
    // Call Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let llmResponse = result.response.text();
 
    // Clean up response - remove markdown code blocks if present
    llmResponse = llmResponse.replace(/```json|```/g, '').trim();
 
    // Parse the JSON response
    let courseStructure;
    try {
      courseStructure = JSON.parse(llmResponse);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Raw response:", llmResponse);
 
      // Attempt to extract JSON using regex as fallback
      const jsonMatch = llmResponse.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          courseStructure = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          throw new Error("Failed to parse LLM response as JSON");
        }
      } else {
        throw new Error("Failed to extract JSON from LLM response");
      }
    }
 
    console.log("Course structure generated:", courseStructure);
 
    // Enhance with YouTube videos
    const enhancedCourse = await addYouTubeVideos(courseStructure);
 
 
    return enhancedCourse;
  } catch (error) {
    console.error("Error generating course structure:", error);
    throw error;
  }
}
 
const youtubeApiKey = process.env.YOUTUBE_API_KEY || "AIzaSyB9beN2WaHZwZGxzekvcpL6C69Sis0Bl1Y";
 
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
  try {
    const response = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" }).generateContent(`
      Generate a short and effective keyword that can be searched for on YouTube for the following search query:
      "${searchQuery}". In this query, give top priority to "${subsectionTitle}" followed by "${moduleTitle}" and then "${courseTitle}".
      The keyword should not be more than 4 words and should be a short phrase relevant to the topic.
    `);
 
    const keyword = response.response.text().trim();
    return keyword;
  } catch (error) {
    console.error("Error generating keyword:", error);
    return searchQuery; // Fallback to original query if keyword generation fails
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
        videoDuration: 'medium'
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
 
export default generateCourse;