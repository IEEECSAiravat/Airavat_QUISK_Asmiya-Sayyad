"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bookmark, Calendar, Download, Share2, Info, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AIGeneratedRoadmap() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>("faq-1")

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Header Navigation */}
      <div className="flex justify-between items-center py-4 px-6 border-b">
        <Link href="/dashboard/roadmaps" className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Roadmaps
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Learning Time
          </Button>
          <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* AI Generated Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6">
        <div className="flex items-center justify-center">
          <Sparkles className="h-5 w-5 mr-2" />
          <span className="font-medium">AI-Generated Roadmap • Personalized for your goals and experience level</span>
        </div>
      </div>

      {/* Roadmap Title */}
      <div className="py-8 px-6">
        <h1 className="text-5xl font-bold mb-4">Frontend Developer Roadmap</h1>
        <p className="text-xl text-gray-600">
          Personalized learning path for becoming a frontend developer with medium time commitment
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b">
        <Tabs defaultValue="roadmap">
          <TabsList className="w-full justify-start border-b-0 bg-transparent p-0">
            <TabsTrigger
              value="roadmap"
              className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Roadmap
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Projects
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Resources
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="absolute right-6">
            <Button variant="ghost" className="text-teal-600 hover:text-teal-800">
              <Sparkles className="h-5 w-5 mr-2" />
              Regenerate Roadmap
            </Button>
          </div>

          <TabsContent value="roadmap" className="pt-6">
            {/* Progress Tracking */}
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center">
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm font-medium mr-3">
                  0% DONE
                </span>
                <span className="text-gray-600">0 of 12 Done</span>
              </div>
              <Button variant="outline" className="text-gray-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Track Progress
              </Button>
            </div>

            {/* Personalization Info */}
            <div className="border rounded-md mb-8 bg-teal-50 border-teal-200">
              <div className="p-4">
                <h3 className="font-medium flex items-center text-teal-800">
                  <Info className="h-5 w-5 mr-2 text-teal-600" />
                  Your Personalized Learning Path
                </h3>
                <p className="mt-2 text-gray-700">
                  This roadmap has been customized based on your goal to become a frontend developer with a medium time
                  commitment (10-15 hours per week). The estimated completion time is 6-8 months.
                </p>
              </div>
            </div>

            {/* Roadmap Flowchart */}
            <div className="mb-12">
              <div className="flex justify-between mb-8">
                <div className="border rounded-md p-6 w-[48%] bg-gradient-to-br from-teal-50 to-white">
                  <p className="mb-4">
                    This roadmap is tailored to your specific needs and goals. You can adjust your preferences anytime.
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">Adjust Preferences</Button>
                </div>

                <div className="border rounded-md p-6 w-[48%] bg-gradient-to-br from-purple-50 to-white">
                  <p className="mb-4">
                    Based on your profile, we've estimated you can complete this roadmap in approximately 6-8 months.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Timeline</Button>
                </div>
              </div>

              {/* Flowchart */}
              <div className="relative flex justify-center">
                <div className="absolute top-0 bottom-0 w-0.5 bg-teal-500 left-1/2 -translate-x-1/2"></div>

                <div className="w-full max-w-4xl">
                  {/* Frontend Fundamentals Label */}
                  <div className="flex justify-center mb-8 relative z-10">
                    <div className="bg-white px-4 text-xl font-bold">Frontend Fundamentals</div>
                  </div>

                  {/* Phase 1: HTML & CSS Basics */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 1: HTML & CSS Basics
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 3-4 weeks</div>
                    </div>
                  </div>

                  {/* HTML */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Start with the building blocks of the web. Focus on semantic HTML and accessibility best
                        practices.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">HTML</div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* CSS */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]"></div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">CSS</div>

                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn layout techniques like Flexbox and Grid. Practice by building responsive designs.
                      </p>
                    </div>
                  </div>

                  {/* Phase 2: JavaScript Fundamentals */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 2: JavaScript Fundamentals
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 6-8 weeks</div>
                    </div>
                  </div>

                  {/* JavaScript Basics */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Master core concepts like variables, functions, arrays, objects, and control flow.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      JavaScript Basics
                    </div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* DOM Manipulation */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]"></div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      DOM Manipulation
                    </div>

                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn to interact with HTML elements using JavaScript and handle browser events.
                      </p>
                    </div>
                  </div>

                  {/* ES6+ Features */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Modern JavaScript features like arrow functions, destructuring, modules, and async/await.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      ES6+ Features
                    </div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Phase 3: Developer Tools */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 3: Developer Tools
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 2-3 weeks</div>
                    </div>
                  </div>

                  {/* Git & GitHub Split */}
                  <div className="relative mb-8">
                    <div className="absolute top-0 w-[40%] h-0.5 bg-teal-500 left-[30%]"></div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-teal-500 left-[30%]"></div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-teal-500 left-[70%]"></div>
                    <div className="absolute top-[50%] w-[40%] h-0.5 bg-teal-500 left-[30%]"></div>

                    <div className="flex justify-between mb-16 pt-8">
                      <div className="w-[25%]">
                        <p className="text-sm mb-2">
                          Learn version control fundamentals and how to manage your code repositories.
                        </p>
                      </div>

                      <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">Git</div>

                      <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">GitHub</div>

                      <div className="w-[25%]">
                        <p className="text-sm mb-2">
                          Create a professional GitHub profile and start building your portfolio.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* npm & Package Management */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn to use package managers to install and manage project dependencies.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      npm & Package Management
                    </div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Phase 4: Frontend Framework */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 4: Frontend Framework
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 8-10 weeks</div>
                    </div>
                  </div>

                  {/* React Fundamentals */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]"></div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      React Fundamentals
                    </div>

                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn component-based architecture, JSX, props, state, and lifecycle methods.
                      </p>
                    </div>
                  </div>

                  {/* React Hooks & Context */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Master modern React patterns with hooks for state management and side effects.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      React Hooks & Context
                    </div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Phase 5: Styling & UI */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 5: Styling & UI
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 3-4 weeks</div>
                    </div>
                  </div>

                  {/* Tailwind CSS */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]"></div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">
                      Tailwind CSS
                    </div>

                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn utility-first CSS to rapidly build modern user interfaces without leaving your HTML.
                      </p>
                    </div>
                  </div>

                  {/* Phase 6: Testing & Deployment */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-teal-100 border border-teal-300 px-8 py-4 rounded-md font-bold text-center w-64 z-10">
                      Phase 6: Testing & Deployment
                      <div className="text-xs font-normal mt-1 text-gray-600">Estimated: 3-4 weeks</div>
                    </div>
                  </div>

                  {/* Vitest */}
                  <div className="flex justify-between mb-12 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn to write unit and integration tests for your React components.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">Vitest</div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Job Readiness Box */}
                  <div className="border rounded-md p-6 mb-12 max-w-2xl mx-auto text-center relative z-10 bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200">
                    <p>
                      Based on your learning pace and time commitment, you should be job-ready in approximately 6-8
                      months. At this point, you'll have the skills needed for junior to mid-level frontend developer
                      positions. Continue building projects and expanding your portfolio to strengthen your job
                      applications.
                    </p>
                  </div>

                  {/* Next Steps Box */}
                  <div className="border rounded-md p-6 mb-12 max-w-md mx-auto text-center relative z-10 bg-white">
                    <p className="mb-4">Continue your learning journey with these advanced topics</p>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      View Advanced Frontend Roadmap
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalized FAQ Section */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How was this roadmap personalized for me?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      This roadmap was generated based on your goal to become a frontend developer, your current skill
                      level, and your available time commitment of 10-15 hours per week. The AI analyzed these factors
                      to create a structured learning path with realistic timeframes for each phase. The technologies
                      chosen (like React and Tailwind) are based on current industry demand and your specific goals.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    Can I adjust the timeline of this roadmap?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Yes, you can adjust the timeline based on your changing availability. If you can dedicate more
                      time, you might complete the roadmap faster. If you need to reduce your weekly hours, the timeline
                      will extend accordingly. Use the "Adjust Preferences" button to update your time commitment and
                      regenerate the roadmap with new time estimates.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    Why was React chosen as the framework for this roadmap?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      React was selected based on several factors: its widespread industry adoption, strong job market
                      demand, gentle learning curve for beginners, and extensive ecosystem of tools and resources. It's
                      an excellent first framework that will make it easier to learn other frameworks like Vue or
                      Angular later if needed. If you'd prefer to focus on a different framework, you can adjust your
                      preferences and regenerate the roadmap.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    What projects should I build while following this roadmap?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>For each phase of the roadmap, we recommend building progressively more complex projects:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Phase 1: Personal portfolio site with HTML/CSS</li>
                      <li>Phase 2: Interactive web applications (todo app, calculator, quiz app)</li>
                      <li>Phase 3: Multi-page website with proper Git workflow</li>
                      <li>Phase 4: React application with multiple components and API integration</li>
                      <li>Phase 5: Polished UI with responsive design using Tailwind</li>
                      <li>Phase 6: Fully tested and deployed application</li>
                    </ul>
                    <p className="mt-2">
                      Check the "Projects" tab for detailed project ideas tailored to each phase of your learning.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How do I know when I'm ready to apply for jobs?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>You'll be ready to apply for junior frontend developer positions when you can confidently:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Build complete React applications from scratch</li>
                      <li>Work with APIs and manage application state</li>
                      <li>Create responsive, accessible user interfaces</li>
                      <li>Use Git for version control and collaboration</li>
                      <li>Write basic tests for your components</li>
                      <li>Showcase 3-5 polished projects in your portfolio</li>
                    </ul>
                    <p className="mt-2">
                      Most importantly, you don't need to know everything before applying. Many companies value
                      potential and learning ability over complete mastery of every technology.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Recommended Resources */}
            <div className="border-t pt-8 mt-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">Personalized Resources</h2>
                </div>
                <Link href="#" className="text-teal-600 hover:text-teal-800">
                  View All Resources →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <span className="font-medium">MDN Web Docs: HTML & CSS Basics</span>
                    <p className="text-sm text-gray-600">Comprehensive reference for Phase 1</p>
                  </div>
                  <Button variant="outline" className="text-teal-600">
                    View Resource
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <span className="font-medium">JavaScript.info</span>
                    <p className="text-sm text-gray-600">Modern JavaScript tutorial for Phase 2</p>
                  </div>
                  <Button variant="outline" className="text-teal-600">
                    View Resource
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <span className="font-medium">React Official Documentation</span>
                    <p className="text-sm text-gray-600">Essential resource for Phase 4</p>
                  </div>
                  <Button variant="outline" className="text-teal-600">
                    View Resource
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <span className="font-medium">Tailwind CSS Documentation</span>
                    <p className="text-sm text-gray-600">Complete guide for Phase 5</p>
                  </div>
                  <Button variant="outline" className="text-teal-600">
                    View Resource
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Roadmaps */}
            <div className="border-t pt-8 mt-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">Similar Roadmaps</h2>
                </div>
                <Link href="#" className="text-teal-600 hover:text-teal-800">
                  All Roadmaps →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Full Stack Developer</span>
                  <span className="text-gray-600">Expand your skills beyond frontend development</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">React Developer</span>
                  <span className="text-gray-600">Deep dive into React ecosystem and advanced patterns</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">UI/UX Designer</span>
                  <span className="text-gray-600">Complement your frontend skills with design expertise</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="pt-6">
            <div className="bg-white border rounded-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Recommended Projects</h2>
              <p className="text-gray-600 mb-6">
                These project ideas are tailored to your skill level and learning path. Each project builds on skills
                from previous phases.
              </p>

              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-2">Phase 1: HTML & CSS Basics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">Personal Portfolio Website</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Create a simple portfolio with about, skills, and contact sections.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HTML</span>
                        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">CSS</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">Restaurant Menu Page</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Build a responsive menu page with sections for different meal types.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HTML</span>
                        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">CSS</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-2">Phase 2: JavaScript Fundamentals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">Interactive Quiz App</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Create a quiz with multiple-choice questions, scoring, and results.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HTML</span>
                        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">CSS</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">JavaScript</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">Weather Dashboard</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Build an app that fetches and displays weather data from an API.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HTML</span>
                        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">CSS</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">JavaScript</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">API</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-2">Phase 4: React Framework</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">Task Management App</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Build a React app for creating, editing, and organizing tasks.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Hooks</span>
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Intermediate</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">E-commerce Product Page</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Create a product listing page with filtering and cart functionality.
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Context API</span>
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Intermediate</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Capstone Project</h3>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Full-Featured Web Application</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Build a complete application that showcases all your skills: React frontend with Tailwind styling,
                      API integration, testing, and deployment.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Suggested ideas: Social media dashboard, project management tool, recipe finder app, or fitness
                      tracker.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">Tailwind</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">API Integration</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Testing</span>
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="pt-6">
            <div className="bg-white border rounded-md p-6">
              <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
              <p className="text-gray-600 mb-6">
                These resources have been selected based on your learning style and current skill level.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3">Phase 1: HTML & CSS Basics</h3>
                  <div className="space-y-3">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">MDN Web Docs: HTML Basics</h4>
                          <p className="text-sm text-gray-600">
                            Comprehensive guide to HTML elements, attributes, and best practices.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">CSS Tricks: A Complete Guide to Flexbox</h4>
                          <p className="text-sm text-gray-600">
                            Visual guide to CSS Flexbox layout with examples and code snippets.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Web.dev: Learn CSS</h4>
                          <p className="text-sm text-gray-600">
                            Google's course on modern CSS techniques and responsive design.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Phase 2: JavaScript Fundamentals</h3>
                  <div className="space-y-3">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">JavaScript.info</h4>
                          <p className="text-sm text-gray-600">
                            Modern JavaScript tutorial covering basics to advanced concepts.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Eloquent JavaScript</h4>
                          <p className="text-sm text-gray-600">
                            Free book that covers JavaScript fundamentals with practical examples.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Phase 4: React Framework</h3>
                  <div className="space-y-3">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">React Official Documentation</h4>
                          <p className="text-sm text-gray-600">
                            Comprehensive guide to React concepts, hooks, and patterns.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">React Hooks Course</h4>
                          <p className="text-sm text-gray-600">
                            Deep dive into React hooks with practical examples and exercises.
                          </p>
                        </div>
                        <Button variant="outline" className="text-teal-600">
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
