"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Star, Search, ArrowLeft, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function MarketingDataCoursePage() {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1])
  const [expandedLectures, setExpandedLectures] = useState<string[]>(["1-1"])
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  })
  const [activeTab, setActiveTab] = useState<"all" | "revision">("all")

  const toggleStep = (stepId: number) => {
    setExpandedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const toggleLecture = (lectureId: string) => {
    setExpandedLectures((prev) =>
      prev.includes(lectureId) ? prev.filter((id) => id !== lectureId) : [...prev, lectureId],
    )
  }

  const openVideoModal = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, title: "", url: "" })
  }

  const openVideoInNewTab = () => {
    window.open(videoModal.url, "_blank")
    closeVideoModal()
  }

  // Course statistics
  const totalModules = 8
  const completedModules = 0
  const completedPercent = Math.round((completedModules / totalModules) * 100)

  const basicTotal = 3
  const basicCompleted = 0
  const intermediateTotal = 3
  const intermediateCompleted = 0
  const advancedTotal = 2
  const advancedCompleted = 0

  // Course steps data
  const steps = [
    {
      id: 1,
      title: "Introduction to Marketing Data",
      progress: "0/4",
      progressPercent: 0,
      lectures: [
        {
          id: "1-1",
          title: "Understanding Marketing Data Landscape",
          progress: "0/4",
          progressPercent: 0,
          problems: [
            {
              id: 1,
              title: "The Evolution of Marketing Data",
              status: "pending",
              difficulty: "Basic",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 2,
              title: "Types of Marketing Data",
              status: "pending",
              difficulty: "Basic",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 3,
              title: "Data Collection Methods",
              status: "pending",
              difficulty: "Basic",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 4,
              title: "Data Privacy and Compliance",
              status: "pending",
              difficulty: "Basic",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Data Analysis Tools and Techniques",
      progress: "0/5",
      progressPercent: 0,
      lectures: [
        {
          id: "2-1",
          title: "Essential Marketing Analytics Tools",
          progress: "0/5",
          progressPercent: 0,
          problems: [
            {
              id: 5,
              title: "Google Analytics Fundamentals",
              status: "pending",
              difficulty: "Intermediate",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 6,
              title: "Social Media Analytics Platforms",
              status: "pending",
              difficulty: "Intermediate",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 7,
              title: "CRM Data Analysis",
              status: "pending",
              difficulty: "Intermediate",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 8,
              title: "Marketing Automation Platforms",
              status: "pending",
              difficulty: "Intermediate",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 9,
              title: "Data Visualization Tools",
              status: "pending",
              difficulty: "Intermediate",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Customer Data Analysis",
      progress: "0/4",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 4,
      title: "Campaign Performance Measurement",
      progress: "0/4",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 5,
      title: "Predictive Analytics in Marketing",
      progress: "0/3",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 6,
      title: "Data-Driven Decision Making",
      progress: "0/3",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 7,
      title: "Marketing Technology Stack",
      progress: "0/3",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 8,
      title: "Advanced Marketing Data Strategies",
      progress: "0/4",
      progressPercent: 0,
      lectures: [],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 min-h-screen pb-10">
      {/* Breadcrumb Navigation */}
      <div className="bg-indigo-900 text-white py-4 px-6 mb-6">
        <div className="flex items-center text-sm">
          <Link href="/dashboard/courses" className="hover:underline flex items-center">
            <span>All Programs</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/dashboard/courses" className="hover:underline">
            <span>School Of Marketing</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>Marketing Data and Technology</span>
        </div>
      </div>

      <div className="px-6">
        {/* Back button */}
        <Link href="/dashboard/courses" className="inline-flex items-center text-gray-600 mb-6 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Courses</span>
        </Link>

        {/* Course Title and Description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Marketing Data and Technology</h1>
          <p className="text-gray-600 mb-4">
            Master the essential data analysis tools and techniques to drive marketing success in the digital age.
            <Link href="#" className="text-orange-500 ml-1 hover:underline">
              Know More
            </Link>
          </p>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
            <p className="font-medium text-blue-800 mb-2">Course Overview:</p>
            <p className="text-gray-700">
              This comprehensive course covers everything from basic marketing data concepts to advanced analytics
              strategies. You'll learn how to collect, analyze, and leverage data to optimize marketing campaigns,
              understand customer behavior, and make data-driven decisions that drive business growth.
            </p>
            <p className="text-gray-700 mt-2">
              Perfect for marketing professionals looking to enhance their data skills or data analysts wanting to
              specialize in marketing applications.
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Course Progress</h2>
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0 md:mr-8">
              <div className="relative w-24 h-24 mr-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-blue-500 transition-all duration-500"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(completedPercent * 0.04 * Math.PI)}% ${
                      50 - 50 * Math.cos(completedPercent * 0.04 * Math.PI)
                    }%, ${completedPercent >= 50 ? "100% 0%, 100% 100%, 0% 100%, 0% 0%" : ""})`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{completedPercent}%</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {completedModules} / {totalModules}
                </div>
                <div className="text-gray-500">Modules completed</div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-1">Basic</h3>
                <div className="text-lg font-medium mb-1">
                  {basicCompleted} / {basicTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(basicCompleted / basicTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Intermediate</h3>
                <div className="text-lg font-medium mb-1">
                  {intermediateCompleted} / {intermediateTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(intermediateCompleted / intermediateTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Advanced</h3>
                <div className="text-lg font-medium mb-1">
                  {advancedCompleted} / {advancedTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(advancedCompleted / advancedTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 mb-4">
              <button
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === "all" ? "bg-blue-100 text-blue-600" : "bg-white border text-gray-700"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Modules
              </button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === "revision" ? "bg-blue-100 text-blue-600" : "bg-white border text-gray-700"
                }`}
                onClick={() => setActiveTab("revision")}
              >
                Bookmarked
              </button>
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search modules..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-white border rounded-md flex items-center">
                <span className="mr-2">Level</span>
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="border rounded-md overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleStep(step.id)}>
                <div className="flex items-center">
                  {expandedSteps.includes(step.id) ? (
                    <ChevronDown className="h-5 w-5 mr-2 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 mr-2 text-gray-600" />
                  )}
                  <span className="font-medium text-gray-800">
                    Module {step.id} : {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${step.progressPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 min-w-[45px] text-right">{step.progress}</span>
                </div>
              </div>

              {expandedSteps.includes(step.id) && step.lectures.length > 0 && (
                <div className="border-t">
                  {step.lectures.map((lecture, lectureIndex) => (
                    <div key={lecture.id} className="border-b last:border-b-0">
                      <div
                        className="flex items-center justify-between p-4 pl-8 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleLecture(lecture.id)}
                      >
                        <div className="flex items-center">
                          {expandedLectures.includes(lecture.id) ? (
                            <ChevronDown className="h-5 w-5 mr-2 text-gray-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 mr-2 text-gray-600" />
                          )}
                          <span className="text-gray-800">
                            Lecture {lectureIndex + 1}: {lecture.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${lecture.progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 min-w-[45px] text-right">{lecture.progress}</span>
                        </div>
                      </div>

                      {expandedLectures.includes(lecture.id) && lecture.problems.length > 0 && (
                        <div className="p-4 bg-gray-50">
                          <div className="border rounded-md overflow-hidden bg-white">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Status
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Topic
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    <div className="flex justify-center">
                                      <span>Quiz</span>
                                    </div>
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Reading
                                    <br />
                                    Material
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Video
                                    <br />
                                    Lecture
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Practice
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Bookmark
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Level
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {lecture.problems.map((problem) => (
                                  <tr key={problem.id}>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {problem.status === "completed" ? (
                                        <div className="flex justify-center">
                                          <div className="h-6 w-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-500">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex justify-center">
                                          <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                                        </div>
                                      )}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="text-gray-900">{problem.title}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      {problem.hasSolution ? (
                                        <button className="text-blue-500 hover:text-blue-700 font-medium">Take</button>
                                      ) : (
                                        <span>-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      {problem.hasDoc ? (
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </button>
                                      ) : (
                                        <span>-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      {problem.hasVideo ? (
                                        <button
                                          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-red-100 text-red-500 hover:bg-red-200"
                                          onClick={() => openVideoModal(problem.title, "https://youtu.be/EAR7De6Goz4")}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                          </svg>
                                        </button>
                                      ) : (
                                        <span>-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button className="text-blue-500 hover:text-blue-700 font-medium">Start</button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200">
                                        <Star className="h-4 w-4" />
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          problem.difficulty === "Basic"
                                            ? "bg-green-100 text-green-800"
                                            : problem.difficulty === "Intermediate"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {problem.difficulty}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">{videoModal.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={openVideoInNewTab}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Open in New Tab
                </button>
                <button
                  onClick={closeVideoModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.url.split("/").pop()}?autoplay=1`}
                title={videoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[500px]"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
