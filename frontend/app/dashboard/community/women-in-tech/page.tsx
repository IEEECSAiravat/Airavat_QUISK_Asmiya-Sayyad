"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Users,
  Shield,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const WomenInTechCommunity = () => {
  const [joined, setJoined] = useState(false)

  const toggleJoin = () => {
    setJoined(!joined)
  }

  const posts = [
    {
      id: 1,
      author: "Priya_Sharma",
      authorImage: "/placeholder.svg?height=40&width=40&query=Priya_Sharma",
      time: "2 hours ago",
      title:
        "TIL about the 'Women Who Code' scholarship program that offers free coding bootcamps for women from underserved communities",
      content:
        "I just found out about this amazing program that provides full scholarships for women from underserved backgrounds to attend coding bootcamps. They also offer mentorship and job placement assistance after completion. This could be life-changing for many women looking to enter tech!",
      link: "https://www.womenwhocode.com/scholarships",
      image: "/placeholder.svg?height=400&width=800&query=women%20coding%20bootcamp%20scholarship",
      upvotes: 342,
      comments: 56,
    },
    {
      id: 2,
      author: "TechSisterHood",
      authorImage: "/placeholder.svg?height=40&width=40&query=TechSisterHood",
      time: "8 hours ago",
      title:
        "TIL that imposter syndrome affects 75% of women in tech, but there are effective strategies to overcome it",
      content:
        "I've been researching imposter syndrome and found that it disproportionately affects women in tech, especially those from underrepresented backgrounds. The good news is that there are proven strategies to overcome it, including mentorship, community support, and cognitive behavioral techniques.",
      link: "https://hbr.org/2021/02/stop-telling-women-they-have-imposter-syndrome",
      image: "/placeholder.svg?height=400&width=800&query=women%20tech%20conference%20diversity",
      upvotes: 287,
      comments: 42,
    },
    {
      id: 3,
      author: "Maya_Dev",
      authorImage: "/placeholder.svg?height=40&width=40&query=Maya_Dev",
      time: "1 day ago",
      title: "TIL about these free resources specifically designed to help women from rural areas learn digital skills",
      content:
        "I discovered a collection of free resources specifically designed for women from rural areas who want to learn digital skills. These include offline-first mobile apps, low-bandwidth video tutorials, and curriculum that doesn't assume prior tech knowledge. Great for those with limited internet access!",
      link: "https://www.digitalskillsfoundation.org/women-rural-tech",
      image: "/placeholder.svg?height=400&width=800&query=rural%20women%20learning%20digital%20skills",
      upvotes: 215,
      comments: 38,
    },
    {
      id: 4,
      author: "Aisha_Coder",
      authorImage: "/placeholder.svg?height=40&width=40&query=Aisha_Coder",
      time: "2 days ago",
      title: "TIL that microloans as small as $500 can help women start tech-enabled businesses in developing regions",
      content:
        "I learned that microloans as small as $500 can help women in developing regions start tech-enabled businesses. These small loans are helping women become digital entrepreneurs, from mobile repair shops to e-commerce businesses. The repayment rates are over 95%, showing how effective these programs are!",
      link: "https://www.kiva.org/lend/women-entrepreneurs",
      image: "/placeholder.svg?height=400&width=800&query=women%20entrepreneurs%20developing%20regions",
      upvotes: 198,
      comments: 31,
    },
    {
      id: 5,
      author: "TechEquality",
      authorImage: "/placeholder.svg?height=40&width=40&query=TechEquality",
      time: "3 days ago",
      title:
        "TIL about 'Tech Without Barriers' program that provides adaptive technology for women with disabilities entering tech",
      content:
        "I just learned about the 'Tech Without Barriers' program that provides adaptive technology and specialized training for women with disabilities who want to enter the tech field. They offer screen readers, voice recognition software, and other tools at no cost, along with tailored training programs.",
      link: "https://techwithoutbarriers.org",
      image: "/placeholder.svg?height=400&width=800&query=adaptive%20technology%20women%20disabilities",
      upvotes: 176,
      comments: 29,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Community Header */}
      <div className="relative">
        <div className="h-32 md:h-48 bg-gradient-to-r from-teal-600 to-teal-500"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20 relative z-10 pb-4 md:pb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-teal-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/diverse-women-innovating.png"
                  alt="Women in Tech"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Women in Tech</h1>
              <p className="text-gray-600 text-sm md:text-base">
                A supportive community for women from underserved backgrounds pursuing careers in technology
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button
                onClick={toggleJoin}
                className={joined ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-teal-600 hover:bg-teal-700"}
              >
                {joined ? "Joined" : "Join"}
              </Button>
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Image src="/vibrant-street-market.png" alt="User" width={40} height={40} className="rounded-full" />
                </div>
                <input
                  type="text"
                  placeholder="Share something with the community..."
                  className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Post
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="hot" className="mb-6">
              <TabsList className="bg-white rounded-lg shadow-sm p-1 w-full justify-start">
                <TabsTrigger
                  value="hot"
                  className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700"
                >
                  Hot
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700"
                >
                  New
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700"
                >
                  Top
                </TabsTrigger>
                <TabsTrigger
                  value="rising"
                  className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700"
                >
                  Rising
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hot" className="mt-0 space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Post Header */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={
                              post.authorImage ||
                              `/placeholder.svg?height=24&width=24&query=${encodeURIComponent(post.author)}`
                            }
                            alt={post.author}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">u/{post.author}</span>
                        <span className="text-xs text-gray-500">• {post.time}</span>
                        <div className="ml-auto">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>

                      {/* Post Content */}
                      <p className="text-gray-700 mb-3">{post.content}</p>

                      {/* Post Link */}
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-teal-600 hover:underline flex items-center gap-1 mb-3"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {post.link}
                        </a>
                      )}

                      {/* Post Image */}
                      {post.image && (
                        <div className="rounded-md overflow-hidden mb-3">
                          <Image
                            src={
                              post.image ||
                              `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(post.title)}`
                            }
                            alt="Post image"
                            width={800}
                            height={400}
                            className="w-full object-cover"
                          />
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center bg-gray-100 rounded-full">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronUp className="h-5 w-5" />
                          </Button>
                          <span className="text-sm font-medium px-1">{post.upvotes}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronDown className="h-5 w-5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-700 flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments} Comments</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 flex items-center gap-1">
                          <Bookmark className="h-4 w-4" />
                          <span>Save</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="new" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">Switch to the "Hot" tab to see community posts</p>
                </div>
              </TabsContent>

              <TabsContent value="top" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">Switch to the "Hot" tab to see community posts</p>
                </div>
              </TabsContent>

              <TabsContent value="rising" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">Switch to the "Hot" tab to see community posts</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-4">
            {/* About Community */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 py-3 px-4">
                <h2 className="text-white font-medium">About Community</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-4">
                  A supportive space for women from underserved backgrounds to connect, learn, and grow in the tech
                  industry. Share resources, ask questions, and find mentorship opportunities.
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="h-4 w-4" />
                  <span>Created Jan 15, 2022</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">67K</p>
                    <p className="text-xs text-gray-600">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">1.2K</p>
                    <p className="text-xs text-gray-600">Online</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Join Community</Button>
                </div>
              </div>
            </div>

            {/* Community Rules */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 py-3 px-4">
                <h2 className="text-white font-medium">Community Rules</h2>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b">
                    <AccordionTrigger className="text-sm font-medium py-2">
                      1. Be respectful and supportive
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Treat all members with respect. No discrimination, harassment, or hate speech will be tolerated.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b">
                    <AccordionTrigger className="text-sm font-medium py-2">
                      2. Share valuable resources
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Focus on sharing educational content, job opportunities, and resources that benefit women in tech.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-b">
                    <AccordionTrigger className="text-sm font-medium py-2">
                      3. Protect personal information
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Do not share personal or sensitive information about yourself or others without consent.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-b">
                    <AccordionTrigger className="text-sm font-medium py-2">4. No self-promotion</AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Avoid excessive self-promotion. Share your work in appropriate threads when relevant.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-sm font-medium py-2">
                      5. Verify information before sharing
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Ensure that resources, scholarships, and opportunities you share are legitimate and verified.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Moderators */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 py-3 px-4">
                <h2 className="text-white font-medium">Moderators</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium">u/TechSisterHood</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium">u/Priya_Sharma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium">u/Maya_Dev</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4 text-teal-600 border-teal-200">
                  View All Moderators
                </Button>
              </div>
            </div>

            {/* Related Communities */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 py-3 px-4">
                <h2 className="text-white font-medium">Related Communities</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/dashboard/community/women-entrepreneurs"
                      className="flex items-center gap-3 hover:bg-teal-50 p-2 rounded-md transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=32&width=32&query=Women%20Entrepreneurs"
                          alt="Women Entrepreneurs"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Women Entrepreneurs</p>
                        <p className="text-xs text-gray-500">42K members</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/community/digital-skills-for-all"
                      className="flex items-center gap-3 hover:bg-teal-50 p-2 rounded-md transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=32&width=32&query=Digital%20Skills"
                          alt="Digital Skills for All"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Digital Skills for All</p>
                        <p className="text-xs text-gray-500">38K members</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/community/tech-scholarships"
                      className="flex items-center gap-3 hover:bg-teal-50 p-2 rounded-md transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=32&width=32&query=Tech%20Scholarships"
                          alt="Tech Scholarships"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tech Scholarships</p>
                        <p className="text-xs text-gray-500">31K members</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WomenInTechCommunity
