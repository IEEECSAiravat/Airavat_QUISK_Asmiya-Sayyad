"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Video,
  Mic,
  MessageSquare,
  BookOpen,
  Award,
  Briefcase,
  X,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Interview {
  id: number
  company: string
  position: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  type: "technical" | "behavioral" | "hr"
  feedback?: string
  interviewers?: string[]
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Frontend Developer",
      date: "2025-04-15",
      time: "10:00 AM",
      status: "upcoming",
      type: "technical",
      interviewers: ["Rahul Sharma", "Priya Patel"],
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "UI/UX Designer",
      date: "2025-04-18",
      time: "2:30 PM",
      status: "upcoming",
      type: "behavioral",
    },
    {
      id: 3,
      company: "Global Systems Inc.",
      position: "Full Stack Developer",
      date: "2025-04-10",
      time: "11:00 AM",
      status: "completed",
      type: "technical",
      feedback: "Strong technical skills. Good problem-solving approach. Need to improve on system design concepts.",
    },
    {
      id: 4,
      company: "Nexus Technologies",
      position: "Product Manager",
      date: "2025-04-05",
      time: "3:00 PM",
      status: "completed",
      type: "hr",
      feedback: "Excellent communication skills. Good understanding of product development lifecycle.",
    },
    {
      id: 5,
      company: "Innovate Solutions",
      position: "Data Analyst",
      date: "2025-04-08",
      time: "9:30 AM",
      status: "cancelled",
      type: "technical",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [vapiInstance, setVapiInstance] = useState<any>(null)
  const [showCoachCard, setShowCoachCard] = useState(true)

  // ✅ API Key and Assistant ID
  const apiKey = "e2ec5304-a7e7-4613-93a0-9f7171f1c0c8"
  const assistantId = "c46d211a-3505-4266-9df9-814b4fe9e1fa"

  // Button configuration for Vapi
  const buttonConfig = {
    position: "bottom-right",
    offset: "40px",
    width: "60px",
    height: "60px",
    idle: {
      color: `rgb(20, 184, 166)`, // teal-500
      type: "pill",
      title: "AI Interview Coach",
      subtitle: "Practice your interview skills",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/mic.svg`,
    },
    loading: {
      color: `rgb(45, 212, 191)`, // teal-400
      type: "pill",
      title: "Preparing Interview...",
      subtitle: "Please wait",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
    },
    active: {
      color: `rgb(236, 72, 153)`, // pink-500
      type: "pill",
      title: "Interview in Progress",
      subtitle: "Click to end session",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
    },
  }

  // Clean up Vapi instance when component unmounts
  const cleanupVapi = () => {
    if (vapiInstance) {
      try {
        vapiInstance.endCall()
      } catch (e) {
        console.error("Error ending call:", e)
      }
      setVapiInstance(null)
    }

    // Remove the script if it exists
    const scriptElement = document.getElementById("vapi-sdk-script")
    if (scriptElement) {
      scriptElement.remove()
    }

    // Remove any Vapi UI elements that might be in the DOM
    const vapiElements = document.querySelectorAll('[class^="vapi-"]')
    vapiElements.forEach((el) => el.remove())
  }

  const startInterview = () => {
    setIsLoading(true)

    // Clean up any existing Vapi instance
    cleanupVapi()

    // Load Vapi SDK
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"
    script.defer = true
    script.async = true
    script.id = "vapi-sdk-script"

    script.onload = () => {
      initializeVapi()
    }

    script.onerror = () => {
      setIsLoading(false)
      console.error("Failed to load Vapi SDK")
    }

    document.body.appendChild(script)
  }

  const initializeVapi = () => {
    if ((window as any).vapiSDK) {
      const instance = (window as any).vapiSDK.run({
        apiKey,
        assistant: assistantId,
        config: buttonConfig,
      })

      setVapiInstance(instance)
      setIsLoading(false)

      // Set up event listeners
      instance.on("call-start", () => {
        console.log("Interview session started")
      })

      instance.on("call-end", () => {
        console.log("Interview session ended")
      })

      instance.on("error", (e: any) => {
        console.error(e)
        setIsLoading(false)
      })
    }
  }

  const closeCoachCard = () => {
    cleanupVapi()
    setShowCoachCard(false)
  }

  const showCoach = () => {
    setShowCoachCard(true)
  }

  const upcomingInterviews = interviews.filter((interview) => interview.status === "upcoming")
  const completedInterviews = interviews.filter((interview) => interview.status === "completed")
  const cancelledInterviews = interviews.filter((interview) => interview.status === "cancelled")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "technical":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Technical
          </Badge>
        )
      case "behavioral":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Behavioral
          </Badge>
        )
      case "hr":
        return (
          <Badge variant="outline" className="border-teal-500 text-teal-500">
            HR
          </Badge>
        )
      default:
        return null
    }
  }

  const renderInterviewCard = (interview: Interview) => (
    <Card key={interview.id} className="mb-4 bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{interview.company}</CardTitle>
            <CardDescription className="text-md font-medium mt-1">{interview.position}</CardDescription>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(interview.status)}
            {getTypeBadge(interview.type)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{new Date(interview.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{interview.time}</span>
          </div>
        </div>

        {interview.interviewers && (
          <div className="mt-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Interviewers: {interview.interviewers.join(", ")}</span>
          </div>
        )}

        {interview.feedback && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700">Feedback:</p>
            <p className="text-sm mt-1 text-gray-600">{interview.feedback}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {interview.status === "upcoming" && (
          <div className="flex gap-2 w-full">
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
              <Video className="h-4 w-4 mr-2" />
              Join Interview
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        )}
        {interview.status === "completed" && !interview.feedback && (
          <Button variant="outline" className="w-full">
            Request Feedback
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Interviews</h1>
        <p className="text-muted-foreground">Manage your upcoming and past interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="upcoming">Upcoming ({upcomingInterviews.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedInterviews.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({cancelledInterviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map(renderInterviewCard)
              ) : (
                <Card className="bg-white">
                  <CardContent className="pt-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-lg font-medium">No upcoming interviews</p>
                    <p className="text-sm text-gray-500 mt-1">
                      When you schedule new interviews, they will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedInterviews.length > 0 ? (
                completedInterviews.map(renderInterviewCard)
              ) : (
                <Card className="bg-white">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-lg font-medium">No completed interviews</p>
                    <p className="text-sm text-gray-500 mt-1">Your completed interviews will be listed here</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelledInterviews.length > 0 ? (
                cancelledInterviews.map(renderInterviewCard)
              ) : (
                <Card className="bg-white">
                  <CardContent className="pt-6 text-center">
                    <XCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-lg font-medium">No cancelled interviews</p>
                    <p className="text-sm text-gray-500 mt-1">Cancelled interviews will appear here</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Interview Preparation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Mic className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Practice with AI</h3>
                  <p className="text-sm text-gray-500">Get instant feedback on your answers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Interview Resources</h3>
                  <p className="text-sm text-gray-500">Access guides and tips</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-md">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Mock Interviews</h3>
                  <p className="text-sm text-gray-500">Schedule practice sessions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-md">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">Job Matching</h3>
                  <p className="text-sm text-gray-500">Find more opportunities</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Resources
              </Button>
            </CardFooter>
          </Card>

          {/* AI Interview Coach Card - with close button */}
          {showCoachCard ? (
            <div className="rounded-lg overflow-hidden shadow-md relative">
              <button
                onClick={closeCoachCard}
                className="absolute top-2 right-2 bg-teal-600 hover:bg-teal-700 rounded-full p-1 text-white z-10"
                aria-label="Close AI Interview Coach"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-teal-100 p-2 rounded-md">
                    <Mic className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">AI Interview Coach</h3>
                    <p className="text-sm text-teal-100">Practice your interview skills</p>
                  </div>
                </div>

                <p className="text-sm mb-3">Practice with our AI assistant</p>

                <p className="text-sm mb-5">
                  Get real-time feedback and improve your interview skills with our AI-powered coach.
                </p>

                <Button
                  variant="secondary"
                  className="w-full bg-white text-teal-700 hover:bg-teal-50 flex items-center justify-center gap-2"
                  onClick={startInterview}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-teal-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Preparing Interview...
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      Start Practice Session
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={showCoach}
              className="bg-teal-600 hover:bg-teal-700 text-white w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Show AI Interview Coach
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
