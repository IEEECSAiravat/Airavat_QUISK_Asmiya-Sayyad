import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function genRoadmap(req, res) {
  const { goal } = req.body;
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBZuDWwC9QC6BortBUgRNN0Z_s23wxpCb4";
  
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const systemPrompt = `
  You are an expert roadmap generator for learning paths. Based on the given input , generate a comprehensive, well-structured roadmap in JSON format.Understand the query well and think and then generate the roadmap.
  
  IMPORTANT GUIDELINES:
  1. Create a hierarchical structure with main categories and subcategories
  2. Each node should have:
     - A unique ID (use descriptive strings like "Frontend-Basics" not numbers)
     - A clear, concise title
     - A detailed description (2-4 sentences explaining what to learn and why it's important)
     - 2-5 high-quality learning resources with title and URL
     - Difficulty level (Beginner, Intermediate, Advanced)
     - Estimated time to complete (in Hours or Days)
  3. Use meaningful dependencies between nodes
  4. Include practical milestones and projects throughout the roadmap
  5. Organize content in a logical learning sequence
  6. For visual clarity, limit main categories to minimum 10 to max 15
  
  STRUCTURE THE JSON AS:
  {
    "title": "Comprehensive Roadmap for [GOAL]",
    "description": "A detailed learning path to master [GOAL]",
    "nodes": [
      {
        "id": "unique-descriptive-id",
        "title": "Node Title",
        "description": "Detailed explanation of this topic/skill",
        "difficulty": "beginner|intermediate|advanced",
        "estimated_time": "X hours/days",
        "resources": [
          { "title": "Resource Title", "url": "https://example.com", "type": "article|video|course|book" },
          ...
        ],
        "depends_on": ["id-of-prerequisite-1", "id-of-prerequisite-2"],
        "milestone_project": "Optional description of a project to build with these skills"
      },
      ...
    ],
    "edges": [
      { "from": "id-of-node-1", "to": "id-of-node-2" },
      ...
    ]
  }
  
  IMPORTANT: Do not include any markdown formatting, code blocks, or explanations in your response. Return only valid JSON.
  `;
  
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nInput: "${goal}"` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 81920, // Increased token limit for more detailed roadmaps
      }
    });
    
    let responseText = result.response.text().trim();
    
    // More robust JSON extraction
    // First, try to extract JSON if it's wrapped in code blocks
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      responseText = jsonMatch[1].trim();
    }
    
    // Additional cleanup to handle any remaining backticks or unexpected formatting
    if (responseText.startsWith('```')) {
      responseText = responseText.substring(responseText.indexOf('\n') + 1);
    }
    if (responseText.endsWith('```')) {
      responseText = responseText.substring(0, responseText.lastIndexOf('```'));
    }
    
    // Parse the JSON
    let roadmap;
    try {
      roadmap = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Response that failed parsing:', responseText);
      return res.status(500).json({ 
        error: 'Failed to parse roadmap JSON', 
        details: parseError.message,
        raw_response: responseText.substring(0, 500) + '...' // First 500 chars for debugging
      });
    }
    
    // Process the roadmap to ensure it's visually optimized
    processRoadmap(roadmap);
    
    res.json({ roadmap });
  } catch (err) {
    console.error('LLM Error:', err);
    res.status(500).json({ error: 'Failed to generate roadmap', details: err.message });
  }
}

// Helper function to optimize the roadmap for visual display
function processRoadmap(roadmap) {
  // Make sure edges array exists
  if (!roadmap.edges) {
    roadmap.edges = [];
  }
  
  // Ensure all nodes have the required properties for visualization
  roadmap.nodes.forEach(node => {
    // Ensure resources array exists
    if (!node.resources) node.resources = [];
    
    // Add difficulty color coding if not present
    if (!node.color) {
      switch(node.difficulty) {
        case 'beginner':
          node.color = 'green';
          break;
        case 'intermediate':
          node.color = 'blue';
          break;
        case 'advanced':
          node.color = 'purple';
          break;
        default:
          node.color = 'gray';
      }
    }
    
    if (node.depends_on && Array.isArray(node.depends_on)) {
      node.depends_on.forEach(dependency => {
        // Check if this edge already exists
        const edgeExists = roadmap.edges.some(
          edge => edge.from === dependency && edge.to === node.id
        );
        
        if (!edgeExists) {
          roadmap.edges.push({
            from: dependency,
            to: node.id
          });
        }
      });
    }
  });
  
  return roadmap;
}