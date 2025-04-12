"use client";
 
import React, { useState, useEffect } from "react";
import axios from "axios";
 
// Enhanced type definitions
interface Resource {
  title: string;
  url: string;
  type?: string;
}
 
interface RoadmapNode {
  id: string | number;
  title: string;
  description: string;
  difficulty?: string;
  estimated_time?: string;
  color?: string;
  resources?: Resource[];
  depends_on?: (string | number)[];
  milestone_project?: string;
  parentId?: string | number;
  children?: RoadmapNode[];
  level?: number;
  position?: "left" | "right";
  category?: string;
}
 
interface Edge {
  from: string | number;
  to: string | number;
}
 
interface Roadmap {
  title: string;
  description: string;
  nodes: RoadmapNode[];
  edges: Edge[];
}
 
// Node card component with improved styling
const NodeCard: React.FC<{
  node: RoadmapNode;
  expanded: boolean;
  toggleExpand: (id: string | number) => void;
  isCompleted: boolean;
  toggleCompleted: (id: string | number) => void;
}> = ({ node, expanded, toggleExpand, isCompleted, toggleCompleted }) => {
  // Determine card color based on difficulty or custom color
  const getBgColor = () => {
    if (isCompleted) return "bg-white-100 border-white-500";
 
    switch(node.difficulty) {
      case "beginner": return "bg-emerald-50 border-emerald-300";
      case "intermediate": return "bg-teal-50 border-teal-300";
      case "advanced": return "bg-purple-50 border-purple-300";
      default: return "bg-yellow-50 border-yellow-300";
    }
  };
 
  return (
    <div className={`rounded-lg shadow-md p-4 mb-2 w-72 border-2 ${getBgColor()} transition-all duration-300`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => toggleCompleted(node.id)}
            className="mr-2 h-4 w-4"
          />
          <h4 className={`font-semibold text-lg ${isCompleted ? "line-through text-gray-500" : ""}`}>{node.title}</h4>
        </div>
        <button
          onClick={() => toggleExpand(node.id)}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1 px-2 rounded"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>
 
      {!expanded && (
        <p className="text-sm text-gray-600 truncate">{node.description.substring(0, 60)}...</p>
      )}
 
      {expanded && (
        <>
          <p className="text-sm text-gray-600 mb-3">{node.description}</p>
 
          {node.difficulty && (
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium mr-2">Difficulty:</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                node.difficulty === "beginner" ? "bg-emerald-100 text-emerald-800" :
                node.difficulty === "intermediate" ? "bg-teal-100 text-teal-800" :
                "bg-purple-100 text-purple-800"
              }`}>
                {node.difficulty}
              </span>
 
              {node.estimated_time && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full ml-2">
                  {node.estimated_time}
                </span>
              )}
            </div>
          )}
 
          {node.milestone_project && (
            <div className="mb-3 bg-amber-50 p-2 rounded border border-amber-200">
              <h5 className="text-xs font-semibold text-amber-800">Project Idea:</h5>
              <p className="text-xs text-amber-700">{node.milestone_project}</p>
            </div>
          )}
 
          {node.resources && node.resources.length > 0 && (
            <div className="mt-2">
              <h5 className="font-medium text-sm mb-1">Resources:</h5>
              <ul className="list-disc ml-4 text-xs">
                {node.resources.map((res, idx) => (
                  <li key={idx} className="mb-1">
                    <a 
                      href={res.url} 
                      className="text-teal-600 hover:underline flex items-center" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {res.title}
                      {res.type && (
                        <span className="ml-1 text-xs bg-gray-100 px-1 rounded">
                          {res.type}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
 
// Main Component
const RoadmapGenerator: React.FC = () => {
  const [goal, setGoal] = useState<string>("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string | number, boolean>>({});
  const [completedNodes, setCompletedNodes] = useState<Record<string | number, boolean>>({});
  const [processedNodes, setProcessedNodes] = useState<RoadmapNode[]>([]);
  const [mainCategories, setMainCategories] = useState<RoadmapNode[]>([]);
  const [viewType, setViewType] = useState<'timeline' | 'mindmap'>('timeline');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
 
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setLoading(true);
    setRoadmap(null);
    setProgress(0);
    setCompletedNodes({});
    try {
      const res = await axios.post<{ roadmap: Roadmap }>("http://localhost:4000/api/roadmap/generate", { goal });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to fetch roadmap.");
    } finally {
      setLoading(false);
    }
  };
 
  // Process the roadmap data to add levels and arrange nodes
  useEffect(() => {
    if (!roadmap) return;
 
    // Create a map of all nodes
    const nodeMap: Record<string | number, RoadmapNode> = {};
    roadmap.nodes.forEach(node => {
      nodeMap[node.id] = { ...node, children: [], level: 0 };
    });
 
    // Process dependencies and create parent-child relationships
    roadmap.edges.forEach(({ from, to }) => {
      if (nodeMap[from] && nodeMap[to]) {
        nodeMap[from].children = nodeMap[from].children || [];
        nodeMap[from].children.push(nodeMap[to]);
        nodeMap[to].parentId = from;
      }
    });
 
    // Find root nodes (those without parents)
    const rootNodes = Object.values(nodeMap).filter(node => !node.parentId);
 
    // Initialize all nodes as not expanded
    const initialExpandState: Record<string | number, boolean> = {};
    roadmap.nodes.forEach(node => {
      initialExpandState[node.id] = false;
    });
    setExpandedNodes(initialExpandState);
 
    // Assign levels to nodes using BFS
    const assignLevels = (nodes: RoadmapNode[], level: number) => {
      const nextLevel: RoadmapNode[] = [];
      nodes.forEach(node => {
        node.level = level;
        if (node.children && node.children.length > 0) {
          nextLevel.push(...node.children);
        }
      });
      if (nextLevel.length > 0) {
        assignLevels(nextLevel, level + 1);
      }
    };
 
    assignLevels(rootNodes, 0);
 
    // Assign main categories (second level nodes or first level if no clear hierarchy)
    const categories = Object.values(nodeMap).filter(node => node.level === 1);
    if (categories.length > 0) {
      setMainCategories(categories);
    } else {
      // If no clear second level, use root nodes as categories
      setMainCategories(rootNodes.slice(0, Math.min(rootNodes.length, 5)));
    }
 
    // Group nodes by level
    const nodesByLevel: Record<number, RoadmapNode[]> = {};
    Object.values(nodeMap).forEach(node => {
      nodesByLevel[node.level || 0] = nodesByLevel[node.level || 0] || [];
      nodesByLevel[node.level || 0].push(node);
    });
 
    // Assign left/right positions alternating but keeping parent-child alignment
    Object.keys(nodesByLevel).forEach(levelKey => {
      const level = parseInt(levelKey);
      nodesByLevel[level].forEach((node, idx) => {
        if (node.parentId && nodeMap[node.parentId]) {
          // Try to align with parent position
          node.position = nodeMap[node.parentId].position;
        } else {
          // Alternate positions for root nodes or when parent position is unknown
          node.position = idx % 2 === 0 ? "left" : "right";
        }
      });
    });
 
    // Add category labels
    if (categories.length > 0) {
      Object.values(nodeMap).forEach(node => {
        if (node.parentId) {
          // Find the root ancestor
          let currentNode = node;
          let rootAncestor = currentNode.parentId ? nodeMap[currentNode.parentId] : undefined;
 
          while (rootAncestor && rootAncestor.parentId) {
            currentNode = rootAncestor;
            rootAncestor = currentNode.parentId ? nodeMap[currentNode.parentId] : undefined;
          }
 
          // Assign category from the top-level parent
          if (rootAncestor && rootAncestor.id) {
            node.category = String(rootAncestor.title);
          }
        }
      });
    }
 
    // Flatten back to array and set
    const processedNodeList = Object.values(nodeMap);
    setProcessedNodes(processedNodeList);
 
  }, [roadmap]);
 
  // Calculate progress whenever completed nodes change
  useEffect(() => {
    if (!roadmap) return;
 
    const totalNodes = roadmap.nodes.length;
    const completedCount = Object.values(completedNodes).filter(Boolean).length;
 
    setProgress(totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0);
  }, [completedNodes, roadmap]);
 
  const toggleExpand = (nodeId: string | number) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };
 
  const toggleCompleted = (nodeId: string | number) => {
    setCompletedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };
 
  // Filter nodes by category
  const filteredNodes = activeFilter
    ? processedNodes.filter(node => node.category === activeFilter)
    : processedNodes;
 
  // Group nodes by level for rendering
  const nodesByLevel = filteredNodes.reduce<Record<number, RoadmapNode[]>>((acc, node) => {
    const level = node.level || 0;
    acc[level] = acc[level] || [];
    acc[level].push(node);
    return acc;
  }, {});
 
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI Learning Roadmap Generator</h1>
      <form onSubmit={handleGenerate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your learning goal (e.g. frontend developer, machine learning engineer)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>
 
      {loading && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-teal-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Creating your personalized learning roadmap...</p>
        </div>
      )}
 
      {roadmap && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{roadmap.title}</h2>
              <p className="text-gray-600">{roadmap.description}</p>
            </div>
 
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm">View as:</span>
                <div className="flex border rounded overflow-hidden">
                  <button 
                    className={`px-3 py-1 text-sm ${viewType === 'timeline' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100'}`}
                    onClick={() => setViewType('timeline')}
                  >
                    Timeline
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm ${viewType === 'mindmap' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100'}`}
                    onClick={() => setViewType('mindmap')}
                  >
                    Mind Map
                  </button>
                </div>
              </div>
 
              <div className="w-40 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm">{Math.round(progress)}% complete</span>
            </div>
          </div>
 
          {/* Category filters */}
          {mainCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                className={`px-3 py-1 text-sm rounded-full ${activeFilter === null ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveFilter(null)}
              >
                All
              </button>
              {mainCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-1 text-sm rounded-full ${activeFilter === category.title ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveFilter(String(category.title))}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
 
          {/* Timeline View */}
          {viewType === 'timeline' && (
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-teal-500 transform -translate-x-1/2"></div>
 
              {/* Nodes by level */}
              {Object.keys(nodesByLevel).sort((a, b) => parseInt(a) - parseInt(b)).map(levelKey => {
                const level = parseInt(levelKey);
                const levelNodes = nodesByLevel[level];
 
                return (
                  <div key={level} className="relative mb-16">
                    {/* Level marker */}
                    <div className="text-center mb-6">
                      <div className="inline-block bg-teal-500 text-white px-4 py-1 rounded-full font-bold text-sm z-10 relative">
                        {level === 0 ? "START" : level === 1 ? "FOUNDATIONS" : level === 2 ? "INTERMEDIATE" : level === 3 ? "ADVANCED" : `LEVEL ${level}`}
                      </div>
                    </div>
 
                    <div className="flex justify-center">
                      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl relative">
                        {/* Nodes for this level */}
                        {levelNodes.map(node => (
                          <div 
                            key={node.id} 
                            className={`${node.position === "left" ? "justify-self-end pr-8" : "justify-self-start pl-8"} relative transition-all duration-300`}
                          >
                            {/* Connector line */}
                            <div 
                              className={`absolute top-8 ${node.position === "left" ? "right-0 w-8" : "left-0 w-8"} h-0.5 bg-teal-300`}
                            ></div>
 
                            {/* Dot on the timeline */}
                            <div className={`absolute top-8 ${node.position === "left" ? "right-0" : "left-0"} transform translate-x-${node.position === "left" ? '1/2' : '-1/2'} -translate-y-1/2 w-3 h-3 rounded-full border-2 ${completedNodes[node.id] ? 'bg-white-500 border-white-600' : 'bg-white border-teal-500'}`}></div>
 
                            {/* Node */}
                            <NodeCard 
                              node={node} 
                              expanded={expandedNodes[node.id] || false}
                              toggleExpand={toggleExpand}
                              isCompleted={completedNodes[node.id] || false}
                              toggleCompleted={toggleCompleted}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
 
              {/* Finish marker */}
              <div className="text-center mt-8">
                <div className="inline-block bg-white-500 text-white px-6 py-2 rounded-full font-bold text-lg z-10 relative">
                  FINISH
                </div>
              </div>
            </div>
          )}
 
          {/* Mind Map View */}
          {viewType === 'mindmap' && (
            <div className="flex justify-center mt-8">
              <div className="relative bg-gray-50 p-8 rounded-lg border w-full overflow-auto" style={{ minHeight: '600px' }}>
                {/* Central node */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-teal-100 border-2 border-teal-500 rounded-lg p-4 w-64 text-center shadow-lg">
                    <h3 className="font-bold text-lg text-teal-800">{roadmap.title.split(':')[0]}</h3>
                    <p className="text-xs text-teal-600">{(roadmap.nodes.length)} learning nodes</p>
                  </div>
 
                  {/* First level nodes */}
                  {mainCategories.map((category, idx) => {
                    // Calculate position around the circle
                    const angle = (idx / mainCategories.length) * 2 * Math.PI;
                    const radius = 250; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
 
                    return (
                      <div key={category.id}>
                        {/* Connector line */}
                        <div 
                          className="absolute bg-teal-200" 
                          style={{
                            width: '2px',
                            height: `${radius}px`,
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'bottom',
                            transform: `rotate(${angle + Math.PI/2}rad)`,
                          }}
                        ></div>
 
                        {/* Category node */}
                        <div 
                          className="absolute w-64 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                        >
                          <NodeCard 
                            node={category}
                            expanded={expandedNodes[category.id] || false}
                            toggleExpand={toggleExpand}
                            isCompleted={completedNodes[category.id] || false}
                            toggleCompleted={toggleCompleted}
                          />
 
                          {/* Show some child nodes if category is expanded */}
                          {expandedNodes[category.id] && category.children && category.children.slice(0, 3).map((child, childIdx) => {
                            const childAngle = angle + (childIdx - 1) * 0.2;
                            const childRadius = 100;
                            const childX = Math.cos(childAngle) * childRadius;
                            const childY = Math.sin(childAngle) * childRadius;
 
                            return (
                              <div key={child.id}>
                                {/* Connector to child */}
                                <div 
                                  className="absolute bg-teal-100" 
                                  style={{
                                    width: '1px',
                                    height: `${childRadius}px`,
                                    left: '50%',
                                    top: '100%',
                                    transformOrigin: 'top',
                                    transform: `rotate(${childAngle + Math.PI/2}rad)`,
                                  }}
                                ></div>
 
                                {/* Child node (smaller) */}
                                <div 
                                  className="absolute transform -translate-x-1/2 -translate-y-1/2 opacity-90 scale-75"
                                  style={{ left: `calc(50% + ${childX}px)`, top: `calc(100% + ${childY}px)` }}
                                >
                                  <NodeCard 
                                    node={child}
                                    expanded={false}
                                    toggleExpand={toggleExpand}
                                    isCompleted={completedNodes[child.id] || false}
                                    toggleCompleted={toggleCompleted}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default RoadmapGenerator;