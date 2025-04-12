"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Star, Plus, Search, ArrowLeft, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function DSACoursePage() {
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
  const totalProblems = 455
  const completedProblems = 18
  const completedPercent = Math.round((completedProblems / totalProblems) * 100)

  const easyTotal = 131
  const easyCompleted = 18
  const mediumTotal = 187
  const mediumCompleted = 0
  const hardTotal = 136
  const hardCompleted = 0

  // Course steps data
  const steps = [
    {
      id: 1,
      title: "Learn the basics",
      progress: "10/31",
      progressPercent: 32,
      lectures: [
        {
          id: "1-1",
          title: "Things to Know in C++/Java/Python or any language",
          progress: "9/9",
          progressPercent: 100,
          problems: [
            {
              id: 1,
              title: "User Input / Output",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 2,
              title: "Data Types",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: false,
              hasVideo: true,
            },
            {
              id: 3,
              title: "If Else statements",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 4,
              title: "Switch Statement",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 5,
              title: "What are arrays, strings?",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: false,
              hasVideo: true,
            },
            {
              id: 6,
              title: "For loops",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 7,
              title: "While loops",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
            {
              id: 8,
              title: "Functions (Pass by Reference and Value)",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: false,
              hasVideo: true,
            },
            {
              id: 9,
              title: "Time Complexity [Learn Basics, and then analyse in next Steps]",
              status: "completed",
              difficulty: "Easy",
              hasSolution: false,
              hasDoc: true,
              hasVideo: true,
            },
          ],
        },
        {
          id: "1-2",
          title: "Build-up Logical Thinking",
          progress: "1/1",
          progressPercent: 100,
          problems: [
            {
              id: 10,
              title: "Pattern Problems",
              status: "completed",
              difficulty: "Easy",
              hasSolution: true,
              hasDoc: true,
              hasVideo: true,
            },
          ],
        },
        {
          id: "1-3",
          title: "Learn STL/Java-Collections or similar thing in your language",
          progress: "0/2",
          progressPercent: 0,
          problems: [],
        },
        {
          id: "1-4",
          title: "Know Basic Maths",
          progress: "0/7",
          progressPercent: 0,
          problems: [],
        },
        {
          id: "1-5",
          title: "Learn Basic Recursion",
          progress: "0/9",
          progressPercent: 0,
          problems: [],
        },
        {
          id: "1-6",
          title: "Learn Basic Hashing",
          progress: "0/3",
          progressPercent: 0,
          problems: [],
        },
      ],
    },
    {
      id: 2,
      title: "Learn Important Sorting Techniques",
      progress: "2/7",
      progressPercent: 28,
      lectures: [],
    },
    {
      id: 3,
      title: "Solve Problems on Arrays [Easy -> Medium -> Hard]",
      progress: "6/40",
      progressPercent: 15,
      lectures: [],
    },
    {
      id: 4,
      title: "Binary Search [1D, 2D Arrays, Search Space]",
      progress: "0/32",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 5,
      title: "Strings [Basic and Medium]",
      progress: "0/15",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 6,
      title: "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
      progress: "0/31",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 7,
      title: "Recursion [PatternWise]",
      progress: "0/25",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 8,
      title: "Bit Manipulation [Concepts & Problems]",
      progress: "0/18",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 9,
      title: "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]",
      progress: "0/30",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 10,
      title: "Sliding Window & Two Pointer Combined Problems",
      progress: "0/12",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 11,
      title: "Heaps [Learning, Medium, Hard Problems]",
      progress: "0/17",
      progressPercent: 0,
      lectures: [],
    },
    {
      id: 12,
      title: "Greedy Algorithms [Easy, Medium/Hard]",
      progress: "0/16",
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
            <span>School Of Data Science</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>Data Structures and Algorithms</span>
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
          <h1 className="text-3xl font-bold mb-2">Strivers A2Z DSA Course</h1>
          <p className="text-gray-600 mb-4">
            This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured
            manner.
            <Link href="#" className="text-orange-500 ml-1 hover:underline">
              Know More
            </Link>
          </p>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
            <p className="font-medium text-amber-800 mb-2">Note:</p>
            <p className="text-gray-700">
              You can find <span className="font-medium">LeetCode</span> links for problems available on the internet.
              However few problems are not there on <span className="font-medium">LeetCode</span> for which you will not
              find a practice link attached. We cannot use third-party links due to legal constraints. Also the newly
              added TUF+ practice links are to give you a free trial of TUF+ which a lot of people asked for. If you
              don't wish to upgrade, you can still use the TUF platform, nothing has changed.
            </p>
            <p className="text-gray-700 mt-2">
              Remember, you started using our website because of our content and not because of some third party links
              :)
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Total Progress</h2>
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0 md:mr-8">
              <div className="relative w-24 h-24 mr-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-orange-500 transition-all duration-500"
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
                  {completedProblems} / {totalProblems}
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-1">Easy</h3>
                <div className="text-lg font-medium mb-1">
                  {easyCompleted} / {easyTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(easyCompleted / easyTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Medium</h3>
                <div className="text-lg font-medium mb-1">
                  {mediumCompleted} / {mediumTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(mediumCompleted / mediumTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Hard</h3>
                <div className="text-lg font-medium mb-1">
                  {hardCompleted} / {hardTotal} <span className="text-gray-500 text-sm">completed</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(hardCompleted / hardTotal) * 100}%` }}
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
                  activeTab === "all" ? "bg-orange-100 text-orange-600" : "bg-white border text-gray-700"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Problems
              </button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === "revision" ? "bg-orange-100 text-orange-600" : "bg-white border text-gray-700"
                }`}
                onClick={() => setActiveTab("revision")}
              >
                Revision
              </button>
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="px-4 py-2 bg-white border rounded-md flex items-center">
                <span className="mr-2">Difficulty</span>
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-white border rounded-md">Pick Random</button>
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
                    Step {step.id} : {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
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
                            Lec {lectureIndex + 1}: {lecture.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
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
                                    Problem
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    <div className="flex justify-center">
                                      <img
                                        src="https://media.geeksforgeeks.org/img-practice/tuf_logo-1631867845.svg"
                                        alt="TUF"
                                        className="h-6"
                                      />
                                    </div>
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Resource
                                    <br />
                                    (Plus)
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Resource
                                    <br />
                                    (Free)
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Practice
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Note
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Revision
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Difficulty
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {lecture.problems.map((problem) => (
                                  <tr key={problem.id}>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {problem.status === "completed" ? (
                                        <div className="flex justify-center">
                                          <div className="h-6 w-6 rounded-md bg-orange-100 flex items-center justify-center text-orange-500">
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
                                        <button className="text-orange-500 hover:text-orange-700 font-medium">
                                          Solve
                                        </button>
                                      ) : (
                                        <span>-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-orange-100 text-orange-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 2H8.828a2 2 0 00-1.414.586L6.293 3.707A1 1 0 015.586 4H4z" />
                                          <path d="M10 8a2 2 0 100 4 2 2 0 000-4zm0 6a4 4 0 110-8 4 4 0 010 8z" />
                                        </svg>
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <div className="flex items-center justify-center space-x-2">
                                        {problem.hasDoc && (
                                          <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-100 text-gray-500">
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
                                        )}
                                        {problem.hasVideo && (
                                          <button
                                            className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-red-100 text-red-500"
                                            onClick={() =>
                                              openVideoModal(problem.title, "https://youtu.be/EAR7De6Goz4")
                                            }
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
                                        )}
                                        {!problem.hasDoc && !problem.hasVideo && <span>-</span>}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span>-</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-100 text-gray-500">
                                        <Plus className="h-4 w-4" />
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-100 text-gray-400">
                                        <Star className="h-4 w-4" />
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Open in New Tab
                </button>
                <button
                  onClick={closeVideoModal}
                  className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
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
