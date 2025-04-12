"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bookmark, Calendar, Download, Share2, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FrontendDeveloperRoadmap() {
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

      {/* Roadmap Title */}
      <div className="py-8 px-6">
        <h1 className="text-5xl font-bold mb-4">Frontend Developer</h1>
        <p className="text-xl text-gray-600">Step by step guide to becoming a modern frontend developer in 2025</p>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b">
        <Tabs defaultValue="roadmap">
          <TabsList className="w-full justify-start border-b-0 bg-transparent p-0">
            <TabsTrigger
              value="roadmap"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent"
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
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-2 bg-transparent"
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
          </TabsList>
          <div className="absolute right-6">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Suggest Changes
            </Button>
          </div>

          <TabsContent value="roadmap" className="pt-6">
            {/* Progress Tracking */}
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm font-medium mr-3">
                  0% DONE
                </span>
                <span className="text-gray-600">0 of 9 Done</span>
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

            {/* What is a Frontend Developer? */}
            <div className="border rounded-md mb-8">
              <div className="flex items-center p-4 cursor-pointer">
                <Info className="h-5 w-5 mr-2 text-gray-600" />
                <h3 className="font-medium">What is a Frontend Developer?</h3>
                <ChevronDown className="h-5 w-5 ml-auto text-gray-400" />
              </div>
            </div>

            {/* Roadmap Flowchart */}
            <div className="mb-12">
              <div className="flex justify-between mb-8">
                <div className="border rounded-md p-6 w-[48%]">
                  <p className="mb-4">This is the beginner friendly version of the Frontend roadmap. Make sure to</p>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">Visit the Detailed Version</Button>
                </div>

                <div className="border rounded-md p-6 w-[48%]">
                  <p className="mb-4">Find the detailed version of this roadmap along with other similar roadmaps</p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">roadmap.sh</Button>
                </div>
              </div>

              {/* Flowchart */}
              <div className="relative flex justify-center">
                <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 left-1/2 -translate-x-1/2"></div>

                <div className="w-full max-w-4xl">
                  {/* Front-end Label */}
                  <div className="flex justify-center mb-8 relative z-10">
                    <div className="bg-white px-4 text-xl font-bold">Front-end</div>
                  </div>

                  {/* HTML */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">HTML</div>
                  </div>

                  {/* CSS */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">CSS</div>
                  </div>

                  {/* JavaScript */}
                  <div className="flex justify-center mb-8 relative">
                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">JavaScript</div>
                  </div>

                  {/* Git & GitHub Split */}
                  <div className="relative mb-8">
                    <div className="absolute top-0 w-[40%] h-0.5 bg-blue-500 left-[30%]"></div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 left-[30%]"></div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 left-[70%]"></div>
                    <div className="absolute top-[50%] w-[40%] h-0.5 bg-blue-500 left-[30%]"></div>

                    <div className="flex justify-between mb-16 pt-8">
                      <div className="w-[25%]">
                        <p className="text-sm mb-2">
                          Learn about Version Control Systems & start using Git for your future projects.
                        </p>
                      </div>

                      <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">Git</div>

                      <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">GitHub</div>

                      <div className="w-[25%]">
                        <p className="text-sm mb-2">
                          Create your GitHub Profile and publish the projects you have developed so far to GitHub.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* npm */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn to use npm package manager. This should be a quick one. Just get the basics and move on.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">npm</div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* React */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]"></div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">React</div>

                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Create some project with React. Make sure to install some external npm packages and include API
                        calls to fetch some external data.
                      </p>
                    </div>
                  </div>

                  {/* Tailwind */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        There are several CSS frameworks available. You can pick any. I would recommend learning
                        Tailwind.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">Tailwind</div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Vitest */}
                  <div className="flex justify-between mb-12 relative">
                    <div className="w-[30%]">
                      <p className="text-sm mb-2">
                        Learn about different Testing types and how to test your frontend using something like Vitest.
                      </p>
                    </div>

                    <div className="bg-yellow-300 px-8 py-3 rounded-md font-bold text-center w-40 z-10">Vitest</div>

                    <div className="w-[30%]"></div>
                  </div>

                  {/* Job Readiness Box */}
                  <div className="border rounded-md p-6 mb-12 max-w-2xl mx-auto text-center relative z-10 bg-white">
                    <p>
                      Depending on the depth of your knowledge and your projects, at this point, you should have enough
                      knowledge to find a Junior to Mid-level (maybe even senior) position at any company. Keep learning
                      and building projects till you find a job. Your job will teach you a lot as well.
                    </p>
                  </div>

                  {/* Continue Learning Box */}
                  <div className="border rounded-md p-6 mb-12 max-w-md mx-auto text-center relative z-10 bg-white">
                    <p className="mb-4">Continue Learning with following roadmap</p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Visit Detailed Frontend Roadmap
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    Is Frontend Development really coding?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p className="mb-3">Do frontend developers really code? The answer is yes, absolutely.</p>
                    <p className="mb-3">
                      The fact that frontend developers are full-time developers who produce an output that is visually
                      appealing (thanks to the designs provided by others) sometimes confuses others, making them
                      believe that frontend developers aren't really coding. However, that couldn't be further from the
                      truth.
                    </p>
                    <p className="mb-3">As a frontend developer, you'll be coding all the time.</p>
                    <p>
                      While in some companies, the frontend developer is also a skilled designer or UX engineer, those
                      are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e
                      coding best practices, software design patterns, frontend architecture, etc).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    Is Frontend Developer a good career?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Yes, Frontend Development is a good career choice. The demand for frontend developers is high, and
                      the role offers competitive salaries, remote work opportunities, and a clear career progression
                      path. As websites and web applications continue to be essential for businesses, the need for
                      skilled frontend developers remains strong.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How to prepare for a frontend developer interview?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      To prepare for a frontend developer interview, focus on core concepts like HTML, CSS, JavaScript,
                      responsive design, and frameworks like React. Practice coding challenges, build a portfolio of
                      projects, and be ready to discuss your problem-solving approach. Review common interview questions
                      about frontend technologies, performance optimization, and accessibility.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How is Frontend Development different from Backend Development?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Frontend development focuses on what users see and interact with in a browser, using HTML, CSS,
                      and JavaScript to create user interfaces. Backend development handles server-side logic,
                      databases, and application architecture using languages like Python, Java, or Node.js. Frontend
                      developers prioritize user experience and visual design, while backend developers focus on data
                      processing, security, and system performance.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    What are the job titles of a Frontend Developer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Common job titles include Frontend Developer, Frontend Engineer, UI Developer, JavaScript
                      Developer, React/Angular/Vue Developer, Web Developer (Frontend focused), Frontend Architect
                      (senior role), and UI Engineer. Some specialized roles include Frontend Performance Engineer or
                      Frontend Accessibility Specialist.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How to become a Frontend Developer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      To become a Frontend Developer, learn HTML, CSS, and JavaScript fundamentals, then progress to
                      frameworks like React. Build projects for your portfolio, practice with coding challenges, and
                      understand responsive design and web accessibility. Consider contributing to open-source projects
                      and networking with other developers. Apply for entry-level positions or internships to gain
                      professional experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    How long does it take to become a Frontend Developer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Becoming a job-ready Frontend Developer typically takes 6-12 months of dedicated learning and
                      practice. The timeline varies based on prior experience, learning intensity, and the depth of
                      skills you aim to develop. With consistent effort, you can master the fundamentals in 3-6 months
                      and spend another 3-6 months building projects and gaining practical experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    What are the Frontend Developer salaries?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Frontend Developer salaries vary by location, experience, and company size. In the US, entry-level
                      positions typically range from $60,000-$85,000, mid-level from $85,000-$120,000, and senior roles
                      from $120,000-$160,000+. Tech hubs like San Francisco and New York offer higher salaries, while
                      remote positions often provide competitive compensation regardless of location.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    Should I learn everything listed on the Frontend Roadmap?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      No, you don't need to learn everything on the Frontend Roadmap. Focus on mastering the
                      fundamentals (HTML, CSS, JavaScript) and one modern framework like React. Learn additional
                      technologies as needed for specific projects or job requirements. The roadmap serves as a guide,
                      not a checklist. Prioritize depth of knowledge in core areas over breadth across all technologies.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    What are Frontend Frameworks?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <p>
                      Frontend frameworks are pre-written JavaScript libraries that provide structure and reusable
                      components for building web applications. Popular frameworks include React, Angular, and Vue.js.
                      They help developers create dynamic, interactive user interfaces more efficiently by offering
                      features like component-based architecture, state management, and virtual DOM for improved
                      performance.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Knowledge Testing Section */}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">Test your Knowledge</h2>
                </div>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  All Quizzes →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">JavaScript</span>
                  <span className="text-gray-600">75 Questions</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">React</span>
                  <span className="text-gray-600">51 Questions</span>
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
                  <h2 className="text-xl font-bold">Related Roadmaps</h2>
                </div>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  All Roadmaps →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Full Stack</span>
                  <span className="text-gray-600">Step by step guide to becoming a full stack developer in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">JavaScript</span>
                  <span className="text-gray-600">Step by step guide to learn JavaScript in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Node.js</span>
                  <span className="text-gray-600">Step by step guide to becoming a Node.js developer in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">React</span>
                  <span className="text-gray-600">Step by step guide to become a React Developer in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Angular</span>
                  <span className="text-gray-600">Step by step guide to become a Angular Developer in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Vue</span>
                  <span className="text-gray-600">Step by step guide to become a Vue Developer in 2025</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <span className="font-medium">Design System</span>
                  <span className="text-gray-600">Step by step guide to building a modern Design System</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="pt-6">
            <div className="flex items-center justify-center h-64 border rounded-md bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Projects Coming Soon</h3>
                <p className="text-gray-600">
                  We're working on adding practical projects to help you apply your frontend skills.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
