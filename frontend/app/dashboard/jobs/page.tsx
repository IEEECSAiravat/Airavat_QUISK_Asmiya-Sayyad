"use client"

import type React from "react"
import { useState } from "react"
import { Search, Briefcase, MapPin, Filter, Clock, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

// API Key for ScrapingDog
const SCRAPINGDOG_API_KEY = "67fa85a3c01dc8e0662780dd"

// Interface for LinkedIn Job API response
interface LinkedInJob {
  job_position: string
  company_name: string
  job_location: string
  job_link: string
  job_id: string
  company_profile: string
  job_posting_date: string
  company_logo_url: string
}

// Mock job data as fallback
const mockJobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $100,000",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "We're looking for an experienced Frontend Developer to join our team...",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "1 day ago",
    skills: ["Python", "TensorFlow", "SQL"],
    description: "Join our data science team to build machine learning models...",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    salary: "$70 - $90 per hour",
    posted: "3 days ago",
    skills: ["Figma", "Adobe XD", "User Research"],
    description: "Looking for a creative designer to improve our product experience...",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    type: "Full-time",
    salary: "$95,000 - $115,000",
    posted: "Just now",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    description: "Help us build and maintain our cloud infrastructure...",
  },
  {
    id: 5,
    title: "Product Manager",
    company: "ProductLabs",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    posted: "5 days ago",
    skills: ["Product Strategy", "Agile", "User Stories"],
    description: "Lead our product development process from conception to launch...",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "ServerTech",
    location: "Remote",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    posted: "1 week ago",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Build robust backend systems for our growing platform...",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")
  const [location, setLocation] = useState("remote")
  const [datePosted, setDatePosted] = useState("recent")
  const [linkedInJobs, setLinkedInJobs] = useState<LinkedInJob[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMockJobs, setShowMockJobs] = useState(true)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [page, setPage] = useState(1)

  // Calculate days ago from posting date
  const getDaysAgo = (postingDate: string): string => {
    const posted = new Date(postingDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - posted.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return `${diffDays} days ago`
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      setError("Please enter a job title or keyword")
      return
    }

    setLoading(true)
    setError(null)
    setPage(1) // Reset to page 1 for new searches

    try {
      // Map datePosted to sort_by parameter
      let sortBy = ""
      if (datePosted === "day") sortBy = "day"
      else if (datePosted === "week") sortBy = "week"
      else if (datePosted === "month") sortBy = "month"

      // Map jobType to job_type parameter
      let jobTypeParam = ""
      if (jobType === "full-time") jobTypeParam = "full_time"
      else if (jobType === "part-time") jobTypeParam = "part_time"
      else if (jobType === "contract") jobTypeParam = "contract"
      else if (jobType === "freelance") jobTypeParam = "temporary"

      // Map location to work_type parameter
      let workType = ""
      if (location === "remote") workType = "remote"
      else if (location === "hybrid") workType = "hybrid"
      else if (location === "onsite") workType = "at_work"

      // Map experience level
      let expLevel = ""
      if (experienceLevel === "entry") expLevel = "entry_level"
      else if (experienceLevel === "associate") expLevel = "associate"
      else if (experienceLevel === "mid-senior") expLevel = "mid_senior_level"
      else if (experienceLevel === "director") expLevel = "director"
      else if (experienceLevel === "internship") expLevel = "internship"

      const params: any = {
        api_key: SCRAPINGDOG_API_KEY,
        field: searchTerm,
        geoid: "102713980", // Default to United States
        page: page,
      }

      // Only add parameters if they have values
      if (workType) params.work_type = workType
      if (jobTypeParam) params.job_type = jobTypeParam
      if (sortBy) params.sort_by = sortBy
      if (expLevel) params.exp_level = expLevel

      const response = await axios.get("https://api.scrapingdog.com/linkedinjobs/", { params })

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setLinkedInJobs(response.data)
        setShowMockJobs(false)
      } else {
        setLinkedInJobs([])
        setError("No jobs found. Try different keywords or filters.")
        setShowMockJobs(true)
      }
    } catch (err: any) {
      console.error("Failed to fetch jobs:", err.message)
      setError("Failed to fetch jobs. Please try again.")
      setShowMockJobs(true)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreJobs = async () => {
    setLoading(true)
    const nextPage = page + 1
    setPage(nextPage)

    try {
      // Map datePosted to sort_by parameter
      let sortBy = ""
      if (datePosted === "day") sortBy = "day"
      else if (datePosted === "week") sortBy = "week"
      else if (datePosted === "month") sortBy = "month"

      // Map jobType to job_type parameter
      let jobTypeParam = ""
      if (jobType === "full-time") jobTypeParam = "full_time"
      else if (jobType === "part-time") jobTypeParam = "part_time"
      else if (jobType === "contract") jobTypeParam = "contract"
      else if (jobType === "freelance") jobTypeParam = "temporary"

      // Map location to work_type parameter
      let workType = ""
      if (location === "remote") workType = "remote"
      else if (location === "hybrid") workType = "hybrid"
      else if (location === "onsite") workType = "at_work"

      // Map experience level
      let expLevel = ""
      if (experienceLevel === "entry") expLevel = "entry_level"
      else if (experienceLevel === "associate") expLevel = "associate"
      else if (experienceLevel === "mid-senior") expLevel = "mid_senior_level"
      else if (experienceLevel === "director") expLevel = "director"
      else if (experienceLevel === "internship") expLevel = "internship"

      const params: any = {
        api_key: SCRAPINGDOG_API_KEY,
        field: searchTerm,
        geoid: "102713980", // Default to United States
        page: nextPage,
      }

      // Only add parameters if they have values
      if (workType) params.work_type = workType
      if (jobTypeParam) params.job_type = jobTypeParam
      if (sortBy) params.sort_by = sortBy
      if (expLevel) params.exp_level = expLevel

      const response = await axios.get("https://api.scrapingdog.com/linkedinjobs/", { params })

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setLinkedInJobs((prev) => [...prev, ...response.data])
      }
    } catch (err: any) {
      console.error("Failed to fetch more jobs:", err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter mock jobs based on search term
  const filteredMockJobs = mockJobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-teal-600">Discover remote opportunities that match your skills and interests</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, skills, or companies"
              className="w-full pl-10 pr-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              "Search Jobs"
            )}
          </Button>
        </form>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center text-teal-600 hover:text-teal-800 font-medium"
          >
            <Filter className="h-4 w-4 mr-1" />
            {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
            {showAdvancedFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </button>
        </div>

        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="job-type" className="block text-sm font-medium text-teal-700 mb-1">
                Job Type
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="job-type" className="w-full">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Job Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-teal-700 mb-1">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="w-full">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="date-posted" className="block text-sm font-medium text-teal-700 mb-1">
                Date Posted
              </label>
              <Select value={datePosted} onValueChange={setDatePosted}>
                <SelectTrigger id="date-posted" className="w-full">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date Posted" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="day">Past 24 hours</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-teal-700 mb-1">
                Experience Level
              </label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger id="experience" className="w-full">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Experience Level" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                  <SelectItem value="mid-senior">Mid-Senior Level</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      </div>

      {/* LinkedIn API Job Results */}
      {!showMockJobs && linkedInJobs.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6">Found {linkedInJobs.length} LinkedIn Job Opportunities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {linkedInJobs.map((job) => (
              <Card key={job.job_id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={job.company_logo_url || "/placeholder.svg?height=40&width=40&query=company logo"}
                      alt={`${job.company_name} logo`}
                      className="w-10 h-10 rounded object-contain border border-teal-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-2">{job.job_position}</h3>
                      <a
                        href={job.company_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 font-medium"
                      >
                        {job.company_name}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center text-teal-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{job.job_location}</span>
                  </div>

                  <div className="flex items-center text-teal-500 mb-4">
                    <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">Posted {getDaysAgo(job.job_posting_date)}</span>
                  </div>
                </CardContent>

                <CardFooter className="bg-teal-50 border-t pt-4">
                  <a
                    href={job.job_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mb-10">
            <Button onClick={loadMoreJobs} className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Loading...
                </>
              ) : (
                "Load More Jobs"
              )}
            </Button>
          </div>
        </>
      )}

      {/* Mock Job Listings (shown when API results are empty or as initial state) */}
      {showMockJobs && (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            {searchTerm ? "Recommended Jobs" : "Featured Job Opportunities"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMockJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                      <p className="text-teal-600 font-medium">{job.company}</p>
                    </div>
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center text-teal-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{job.location}</span>
                  </div>

                  <div className="text-teal-700 mb-4">
                    <p className="text-sm line-clamp-2">{job.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <span className="text-teal-500 text-sm">{job.posted}</span>
                  <span className="font-medium">{job.salary}</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredMockJobs.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-16 text-center">
              <svg
                className="w-16 h-16 text-teal-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-xl text-teal-600">No jobs found matching your criteria</p>
              <p className="text-teal-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
