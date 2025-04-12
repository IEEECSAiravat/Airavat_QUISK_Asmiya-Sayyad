"use client"

import { useState } from "react"
import { BookOpen, Sparkles, Globe, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import RoadmapGenerator from "@/components/roadmap-generator"
export default function RoadmapsPage() {
  const router = useRouter()
  const [selectedRoadmapType, setSelectedRoadmapType] = useState<string | null>(null)

  const roadmapTypes = [
    {
      id: "official",
      title: "Official Roadmaps",
      description: "Made by subject matter experts",
      icon: BookOpen,
      color: "bg-teal-700",
    },
    {
      id: "ai",
      title: "AI Roadmaps",
      description: "Generate roadmaps with AI",
      icon: Sparkles,
      color: "bg-teal-700",
    },
    {
      id: "community",
      title: "Community Roadmaps",
      description: "Made by community members",
      icon: Globe,
      color: "bg-teal-700",
    },
  ]

  const handleGenerateRoadmap = () => {
    router.push("/components/roadmap-generator")
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Roadmaps</h1>
        <p className="text-teal-700">
          Follow structured learning paths to achieve your career goals. Choose from expert-curated, AI-generated, or
          community-created roadmaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roadmapTypes.map((type) => (
          <Card
            key={type.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-teal-700"
            onClick={() => setSelectedRoadmapType(type.id)}
          >
            <CardHeader className={`${type.color} text-white p-4 flex flex-row items-center space-y-0 gap-3`}>
              <div className="bg-teal-700/30 p-2 rounded-full">
                <type.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription className="text-teal-700">{type.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-teal-700">
                  {type.id === "official"
                    ? "Curated by industry experts"
                    : type.id === "ai"
                      ? "Personalized to your needs"
                      : "Created by peers"}
                </span>
                <ChevronRight className="h-5 w-5 text-teal-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for selected roadmap type content */}
      {selectedRoadmapType && (
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedRoadmapType(null)}
              className="text-teal-700 hover:text-teal-800 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Roadmap Types
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {roadmapTypes.find((type) => type.id === selectedRoadmapType)?.title}
          </h2>

          {selectedRoadmapType === "official" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Frontend Developer",
                  description: "Step by step guide to becoming a modern frontend developer",
                  level: "Beginner to Advanced",
                  duration: "6-12 months",
                  image: "/frontend-development-journey.jpg",
                  link: "/dashboard/roadmaps/frontend-developer",
                },
                {
                  title: "Backend Developer",
                  description: "Everything you need to know to become a backend developer",
                  level: "Beginner to Advanced",
                  duration: "6-12 months",
                  image: "/backend-roadmap-concept.jpg",
                },
                {
                  title: "DevOps Engineer",
                  description: "Step by step guide to DevOps and deployment",
                  level: "Intermediate to Advanced",
                  duration: "8-14 months",
                  image: "/evolving-devops-journey.jpg",
                },
                {
                  title: "Data Scientist",
                  description: "Comprehensive path to becoming a data scientist",
                  level: "Beginner to Advanced",
                  duration: "10-16 months",
                  image: "/data-science-journey.jpg",
                },
                {
                  title: "Mobile Developer",
                  description: "Guide to becoming a mobile app developer",
                  level: "Beginner to Advanced",
                  duration: "6-12 months",
                  image: "/mobile-dev-journey.jpg",
                },
                {
                  title: "Blockchain Developer",
                  description: "Complete roadmap to blockchain development",
                  level: "Intermediate to Advanced",
                  duration: "8-14 months",
                  image: "/blockchain-roadmap-concept.jpg",
                },
              ].map((roadmap, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={roadmap.image || "/placeholder.svg"}
                      alt={roadmap.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{roadmap.title}</CardTitle>
                    <CardDescription>{roadmap.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between text-sm text-teal-700 mb-4">
                      <span>{roadmap.level}</span>
                      <span>{roadmap.duration}</span>
                    </div>
                    <Link
                      href={roadmap.link || "#"}
                      className="block w-full bg-teal-600 text-white text-center py-2 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      View Roadmap
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedRoadmapType === "ai" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Generate a Personalized Roadmap</h3>
              {/* <div className="mb-6">
                <label className="block text-sm font-medium text-teal-700 mb-2">What is your goal?</label>
                <input
                  type="text"
                  placeholder="e.g., Become a full-stack developer, Learn machine learning"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  defaultValue="Become a frontend developer"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-teal-700 mb-2">Your current skill level</label>
                <select
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  defaultValue="beginner"
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner - No experience</option>
                  <option value="intermediate">Intermediate - Some experience</option>
                  <option value="advanced">Advanced - Experienced professional</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-teal-700 mb-2">Time commitment</label>
                <select
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  defaultValue="medium"
                >
                  <option value="">Select time commitment</option>
                  <option value="low">Low - Few hours per week</option>
                  <option value="medium">Medium - 10-15 hours per week</option>
                  <option value="high">High - 20+ hours per week</option>
                </select>
              </div>
              <button
                className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-500 transition-colors flex items-center justify-center"
                onClick={handleGenerateRoadmap}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate My Roadmap
              </button> */}
                <RoadmapGenerator onGenerate={handleGenerateRoadmap} />
            </div>
          )}

          {selectedRoadmapType === "community" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search community roadmaps..."
                    className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Roadmap
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Web3 Development Path",
                    author: "crypto_enthusiast",
                    votes: 342,
                    image: "/interconnected-web3.jpg",
                  },
                  {
                    title: "Game Development with Unity",
                    author: "game_dev_pro",
                    votes: 287,
                    image: "/coding-unity.jpg",
                  },
                  {
                    title: "UI/UX Design Mastery",
                    author: "design_guru",
                    votes: 256,
                    image: "/abstract-ui-ux.jpg",
                  },
                  {
                    title: "Handmade Jwellery",
                    author: "shalini_123",
                    votes: 142,
                    image: "/handmade-jwellery.jpeg",
                  },
                  {
                    title: "Cloud Kitchen",
                    author: "nandini_456",
                    votes: 842,
                    image: "/Cooking.jpeg",
                  },
                  {
                    title: "Learn English",
                    author: "farnanda_789",
                    votes: 348,
                    image: "/english-speaking.jpeg",
                  },
                  {
                    title: "Cloud Architecture on AWS",
                    author: "cloud_expert",
                    votes: 198,
                    image: "/aws-cloud-architecture-diagram.jpg",
                  },
                  {
                    title: "Cybersecurity Career Path",
                    author: "security_specialist",
                    votes: 176,
                    image: "/digital-fortress.jpg",
                  },
                  {
                    title: "AI & ML Engineering",
                    author: "ml_engineer",
                    votes: 154,
                    image: "/interconnected-ai.jpg",
                  },
                ].map((roadmap, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={roadmap.image || "/placeholder.svg"}
                        alt={roadmap.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{roadmap.title}</CardTitle>
                      <CardDescription>Created by @{roadmap.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-amber-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1">{roadmap.votes} upvotes</span>
                        </div>
                        <span className="text-sm text-gray-500">4 weeks ago</span>
                      </div>
                      <Link
                        href="#"
                        className="block w-full bg-teal-600 text-white text-center py-2 rounded-md hover:bg-teal-700 transition-colors"
                      >
                        View Roadmap
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
