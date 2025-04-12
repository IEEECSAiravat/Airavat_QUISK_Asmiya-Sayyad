"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
 
interface Subsection {
  subsectionId: number;
  subsectionTitle: string;
  content: string;
  youtubeVideoId?: string | null;
}
 
interface Module {
  moduleId: number;
  moduleTitle: string;
  moduleDescription: string;
  subsections: Subsection[];
}
 
interface CourseData {
  courseTitle: string;
  courseLevel: string;
  courseGoal: string;
  modules: Module[];
}
 
interface FormData {
  title: string;
  level: string;
  goal: string;
  currentState: string;
}
 
export default function CourseGenerator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    title: '',
    level: 'beginner',
    goal: '',
    currentState: ''
  });
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const response = await axios.post<CourseData>(
        'http://localhost:4000/api/roadmap/generate-course', 
        {
          title: formData.title,
          level: formData.level,
          goal: formData.goal,
          currentState: formData.currentState
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
 
      setCourseData(response.data);
 
      // Initialize first module as expanded
      if (response.data.modules.length > 0) {
        setExpandedModules({ 1: true });
      }
    } catch (error) {
      console.error('Error generating course:', error);
      setError('Failed to generate course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
 
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
 
  const toggleSubsection = (key: string) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
 
  const formatContent = (content: string) => {
    // Simple markdown-to-HTML conversion for paragraphs
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };
 
  return (
    <div className="max-w-5xl mx-auto p-6 bg-teal-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          AI Course Generator
        </h1>
        <p className="text-teal-600 max-w-2xl mx-auto">
          Generate comprehensive, structured learning paths tailored to your skill level and goals
        </p>
      </div>
 
      {/* Course Generator Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 mb-10 border border-teal-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="title">
              Course Title
            </label>
            <input
              className="shadow-sm appearance-none border border-teal-200 rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Machine Learning Fundamentals"
              required
            />
          </div>
 
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="level">
              Course Level
            </label>
            <select
              className="shadow-sm appearance-none border border-teal-200 rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
 
        <div className="mb-4">
          <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="goal">
            Your Goal with this Course
          </label>
          <textarea
            className="shadow-sm appearance-none border border-teal-200 rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            placeholder="What do you want to achieve by taking this course?"
            rows={3}
            required
          />
        </div>
 
        <div className="mb-6">
          <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="currentState">
            Your Current Knowledge
          </label>
          <textarea
            className="shadow-sm appearance-none border border-teal-200 rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            id="currentState"
            name="currentState"
            value={formData.currentState}
            onChange={handleInputChange}
            placeholder="Describe your current knowledge level in this subject"
            rows={3}
            required
          />
        </div>
 
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <div className="flex">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
 
        <div className="flex items-center justify-center mt-6">
          <button
            className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 shadow-lg transform hover:scale-105"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating your course...</span>
              </div>
            ) : 'Generate Learning Path'}
          </button>
        </div>
      </form>
 
      {/* Course Display Section */}
      {courseData && (
        <div className="course-content bg-white shadow-xl rounded-xl p-8 mb-10 border border-teal-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              {courseData.courseTitle}
            </h2>
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-teal-100 to-purple-100 border border-teal-200 rounded-full px-4 py-1 text-sm font-semibold text-teal-700 shadow-sm">
                {courseData.courseLevel.charAt(0).toUpperCase() + courseData.courseLevel.slice(1)} Level
              </span>
            </div>
            <p className="text-teal-700 max-w-3xl mx-auto">{courseData.courseGoal}</p>
          </div>
 
          <div className="modules space-y-6">
            {courseData.modules.map((module) => (
              <div key={module.moduleId} className="module border border-teal-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                <button
                  onClick={() => toggleModule(module.moduleId)}
                  className={`w-full text-left p-5 flex items-center justify-between ${
                    expandedModules[module.moduleId] ? 'bg-teal-50' : 'bg-white'
                  } hover:bg-teal-50 transition-colors duration-150`}
                >
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                      {module.moduleId}
                    </div>
                    <h3 className="text-xl font-bold text-teal-800">{module.moduleTitle}</h3>
                  </div>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-200 ${expandedModules[module.moduleId] ? 'rotate-180' : ''} text-teal-500`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
 
                {expandedModules[module.moduleId] && (
                  <div className="p-5 border-t border-teal-200 bg-white">
                    <p className="mb-6 text-teal-700 italic bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                      {module.moduleDescription}
                    </p>
 
                    <div className="subsections space-y-6">
                      {module.subsections.map((subsection) => {
                        const subsectionKey = `${module.moduleId}-${subsection.subsectionId}`;
                        const isExpanded = expandedSubsections[subsectionKey];
 
                        return (
                          <div key={subsectionKey} className="subsection border border-teal-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                            <button
                              onClick={() => toggleSubsection(subsectionKey)}
                              className={`w-full text-left p-4 flex items-center justify-between ${
                                isExpanded ? 'bg-teal-50' : 'bg-white'
                              } hover:bg-teal-50 transition-colors duration-150`}
                            >
                              <div className="flex items-center">
                                <div className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold shadow-sm">
                                  {subsection.subsectionId}
                                </div>
                                <h4 className="text-lg font-semibold text-teal-800">{subsection.subsectionTitle}</h4>
                              </div>
                              <svg 
                                className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} text-teal-500`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </button>
 
                            {isExpanded && (
                              <div className="border-t border-teal-200">
                                {subsection.youtubeVideoId && (
                                  <div className="video-preview bg-gradient-to-r from-teal-900 to-teal-800 pt-5 pb-2 px-5">
                                    <h5 className="text-white text-sm font-semibold mb-3 flex items-center">
                                      <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                      </svg>
                                      Video Lecture
                                    </h5>
                                    <div className="video-container relative overflow-hidden rounded-lg shadow-lg mb-4 aspect-video">
                                      <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        src={`https://www.youtube.com/embed/${subsection.youtubeVideoId}`}
                                        title={subsection.subsectionTitle}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  </div>
                                )}
 
                                <div className="p-5">
                                  <div className="content prose max-w-none text-teal-700">
                                    {formatContent(subsection.content)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* Footer */}
      <div className="text-center text-teal-500 text-sm mt-10 pb-6">
        <p>© {new Date().getFullYear()} AI Course Generator. All rights reserved.</p>
      </div>
    </div>
  );
}