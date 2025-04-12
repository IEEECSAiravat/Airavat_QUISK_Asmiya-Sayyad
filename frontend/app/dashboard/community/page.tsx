"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, TrendingUp, MessageSquare, Users, BookOpen, Code, Briefcase, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Community {
  id: number
  name: string
  icon: string
  description: string
  members: string
  category: string
}

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const communities: Community[] = [
    // Tech Communities
    {
      id: 1,
      name: "Frontend Developers",
      icon: "/frontend-dev-icon.png",
      description: "Discuss React, Vue, Angular and all things frontend",
      members: "67K members",
      category: "tech",
    },
    {
      id: 2,
      name: "Data Science Hub",
      icon: "/data-science-icon.png",
      description: "Share insights, tools, and career advice for data scientists",
      members: "54K members",
      category: "tech",
    },
    {
      id: 3,
      name: "Women in Tech",
      icon: "/women-in-tech-icon.png",
      description: "A supportive community for women from underserved backgrounds in technology",
      members: "67K members",
      category: "empowerment",
    },
    {
      id: 4,
      name: "Women Entrepreneurs",
      icon: "/women-entrepreneurs-icon.png",
      description: "Resources and support for women starting and growing businesses",
      members: "42K members",
      category: "empowerment",
    },
    {
      id: 5,
      name: "Digital Skills for All",
      icon: "/digital-skills-icon.png",
      description: "Making digital literacy accessible to underserved communities",
      members: "38K members",
      category: "digital",
    },
    {
      id: 6,
      name: "Rural Tech Connect",
      icon: "/rural-tech-icon.png",
      description: "Bridging the digital divide for women in rural areas",
      members: "35K members",
      category: "empowerment",
    },
    {
      id: 7,
      name: "Tech Scholarships",
      icon: "/tech-scholarships-icon.png",
      description: "Information on scholarships and financial aid for tech education",
      members: "31K members",
      category: "empowerment",
    },
    {
      id: 8,
      name: "Product Management",
      icon: "/product-management-icon.png",
      description: "Strategies, tools, and discussions for product managers",
      members: "46K members",
      category: "business",
    },
    {
      id: 9,
      name: "UX/UI Design",
      icon: "/ux-ui-design-icon.png",
      description: "Design principles, tools, and portfolio reviews",
      members: "45K members",
      category: "design",
    },
    {
      id: 10,
      name: "Career Transitions",
      icon: "/career-transitions-icon.png",
      description: "Support for those changing careers or industries",
      members: "40K members",
      category: "career",
    },
    {
      id: 11,
      name: "AI Enthusiasts",
      icon: "/ai-enthusiasts-icon.png",
      description: "Discussions on AI, ML, and future technologies",
      members: "38K members",
      category: "tech",
    },
    {
      id: 12,
      name: "Digital Marketing",
      icon: "/digital-marketing-icon.png",
      description: "Strategies, tools, and trends in digital marketing",
      members: "37K members",
      category: "digital",
    },

    // Digital & Tech Skills
    {
      id: 13,
      name: "Basic Computer Literacy",
      icon: "/computer-literacy-icon.png",
      description: "MS Office, Email, Internet navigation",
      members: "45K members",
      category: "digital",
    },
    {
      id: 14,
      name: "Graphic Design",
      icon: "/graphic-design-icon.png",
      description: "Canva, Photoshop, Illustrator basics",
      members: "42K members",
      category: "digital",
    },
    {
      id: 15,
      name: "Web Development",
      icon: "/web-dev-icon.png",
      description: "HTML, CSS, JavaScript (Basic front-end)",
      members: "48K members",
      category: "digital",
    },
    {
      id: 16,
      name: "Mobile App Usage & Safety",
      icon: "/mobile-safety-icon.png",
      description: "How to use smartphones securely, apps like WhatsApp, UPI, etc.",
      members: "36K members",
      category: "digital",
    },
    {
      id: 17,
      name: "Data Entry & Excel",
      icon: "/data-entry-icon.png",
      description: "Ideal for remote jobs and admin work",
      members: "39K members",
      category: "digital",
    },

    // Handicrafts & Traditional Skills
    {
      id: 18,
      name: "Tailoring & Sewing",
      icon: "/tailoring-icon.png",
      description: "Basic to advanced stitching, embroidery",
      members: "41K members",
      category: "handicrafts",
    },
    {
      id: 19,
      name: "Handmade Jewelry & Accessories",
      icon: "/jewelry-icon.png",
      description: "Beading, wire work, upcycled jewelry",
      members: "38K members",
      category: "handicrafts",
    },
    {
      id: 20,
      name: "Knitting & Crochet",
      icon: "/knitting-icon.png",
      description: "For garment or accessory making",
      members: "35K members",
      category: "handicrafts",
    },
    {
      id: 21,
      name: "Pottery & Ceramics",
      icon: "/pottery-icon.png",
      description: "Skill development for rural artisans",
      members: "32K members",
      category: "handicrafts",
    },

    // Culinary & Food Skills
    {
      id: 22,
      name: "Home-based Cooking Business",
      icon: "/cooking-business-icon.png",
      description: "Catering, tiffin services, baking",
      members: "44K members",
      category: "culinary",
    },
    {
      id: 23,
      name: "Preserving & Pickle Making",
      icon: "/preserving-icon.png",
      description: "Jam, jelly, chutneys, etc.",
      members: "36K members",
      category: "culinary",
    },
    {
      id: 24,
      name: "Healthy Food & Nutrition",
      icon: "/nutrition-icon.png",
      description: "Especially useful for home chefs and childcare workers",
      members: "40K members",
      category: "culinary",
    },

    // Beauty & Wellness
    {
      id: 25,
      name: "Beautician Training",
      icon: "/beautician-icon.png",
      description: "Hair care, facials, waxing, threading",
      members: "43K members",
      category: "beauty",
    },
    {
      id: 26,
      name: "Spa & Massage Therapy",
      icon: "/spa-icon.png",
      description: "Professional massage and spa techniques",
      members: "37K members",
      category: "beauty",
    },
    {
      id: 27,
      name: "Yoga & Fitness Basics",
      icon: "/yoga-icon.png",
      description: "Can train women to become instructors",
      members: "41K members",
      category: "beauty",
    },

    // Entrepreneurship & Business
    {
      id: 28,
      name: "Microbusiness & Self-employment",
      icon: "/microbusiness-icon.png",
      description: "Idea generation, business planning",
      members: "39K members",
      category: "business",
    },
    {
      id: 29,
      name: "Financial Literacy",
      icon: "/financial-literacy-icon.png",
      description: "Budgeting, saving, understanding loans",
      members: "42K members",
      category: "business",
    },
    {
      id: 30,
      name: "E-commerce Basics",
      icon: "/ecommerce-icon.png",
      description: "Selling on Meesho, Amazon, WhatsApp",
      members: "38K members",
      category: "business",
    },
    {
      id: 31,
      name: "Social Media for Business",
      icon: "/social-media-business-icon.png",
      description: "Instagram/Facebook marketing",
      members: "40K members",
      category: "business",
    },

    // Sustainable Livelihood Skills
    {
      id: 32,
      name: "Organic Farming & Kitchen Gardening",
      icon: "/organic-farming-icon.png",
      description: "Urban and rural applicability",
      members: "36K members",
      category: "sustainable",
    },
    {
      id: 33,
      name: "Vermicomposting & Waste Management",
      icon: "/waste-management-icon.png",
      description: "For green startups",
      members: "32K members",
      category: "sustainable",
    },
    {
      id: 34,
      name: "Handmade Paper & Eco-friendly Products",
      icon: "/eco-products-icon.png",
      description: "Bags, plates, packaging items",
      members: "34K members",
      category: "sustainable",
    },

    // Service & Job-Oriented Courses
    {
      id: 35,
      name: "Domestic Work with Dignity",
      icon: "/domestic-work-icon.png",
      description: "Professionalism, rights, contracts",
      members: "38K members",
      category: "service",
    },
    {
      id: 36,
      name: "Elderly & Childcare Training",
      icon: "/childcare-icon.png",
      description: "First aid, caregiving techniques",
      members: "39K members",
      category: "service",
    },
    {
      id: 37,
      name: "Retail Assistant Training",
      icon: "/retail-icon.png",
      description: "POS handling, customer service",
      members: "36K members",
      category: "service",
    },
    {
      id: 38,
      name: "Hospitality Services",
      icon: "/hospitality-icon.png",
      description: "Room service, basic housekeeping",
      members: "35K members",
      category: "service",
    },

    // Language & Communication
    {
      id: 39,
      name: "Spoken English & Soft Skills",
      icon: "/english-icon.png",
      description: "Confidence building, workplace etiquette",
      members: "45K members",
      category: "language",
    },
    {
      id: 40,
      name: "Vernacular to English Translation",
      icon: "/translation-icon.png",
      description: "For content/voice work",
      members: "36K members",
      category: "language",
    },
    {
      id: 41,
      name: "Call Center Training",
      icon: "/call-center-icon.png",
      description: "Voice modulation, tele-etiquette",
      members: "38K members",
      category: "language",
    },
  ]

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SkillSakhi Community</h1>
          <p className="text-gray-600 mt-1">Connect, learn, and grow with peers in your field</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </Button>
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            <MessageSquare className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search communities..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="text-sm">
            All Communities
          </TabsTrigger>
          <TabsTrigger value="tech" className="text-sm">
            Tech
          </TabsTrigger>
          <TabsTrigger value="digital" className="text-sm">
            Digital Skills
          </TabsTrigger>
          <TabsTrigger value="empowerment" className="text-sm">
            Women Empowerment
          </TabsTrigger>
          <TabsTrigger value="handicrafts" className="text-sm">
            Handicrafts
          </TabsTrigger>
          <TabsTrigger value="culinary" className="text-sm">
            Culinary
          </TabsTrigger>
          <TabsTrigger value="beauty" className="text-sm">
            Beauty & Wellness
          </TabsTrigger>
          <TabsTrigger value="business" className="text-sm">
            Business
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Communities</h2>
          <p className="text-gray-600 mb-6">Browse SkillSakhi's largest skill communities</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredCommunities.slice(0, 12).map((community, index) => (
              <Link
                href={`/dashboard/community/${community.name.toLowerCase().replace(/\s+/g, "-")}`}
                key={community.id}
                className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 mr-4 relative">
                  <div className="absolute -left-2 -top-2 bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
                    <Image
                      src={
                        community.icon && community.icon !== ""
                          ? community.icon
                          : `/placeholder.svg?height=50&width=50&query=${encodeURIComponent(community.name || "Community")}`
                      }
                      alt={community.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{community.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{community.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{community.members}</p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        {[
          "tech",
          "digital",
          "empowerment",
          "handicrafts",
          "culinary",
          "beauty",
          "business",
          "sustainable",
          "service",
          "language",
        ].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
              {category === "digital"
                ? "Digital & Tech Skills"
                : category === "handicrafts"
                  ? "Handicrafts & Traditional Skills"
                  : category === "culinary"
                    ? "Culinary & Food Skills"
                    : category === "beauty"
                      ? "Beauty & Wellness"
                      : category === "business"
                        ? "Entrepreneurship & Business"
                        : category === "sustainable"
                          ? "Sustainable Livelihood Skills"
                          : category === "service"
                            ? "Service & Job-Oriented Courses"
                            : category === "language"
                              ? "Language & Communication"
                              : category === "empowerment"
                                ? "Women Empowerment Communities"
                                : `${category} Communities`}
            </h2>
            <p className="text-gray-600 mb-6">
              Browse communities related to{" "}
              {category === "digital"
                ? "digital and tech skills"
                : category === "handicrafts"
                  ? "handicrafts and traditional skills"
                  : category === "culinary"
                    ? "culinary and food skills"
                    : category === "beauty"
                      ? "beauty and wellness"
                      : category === "business"
                        ? "entrepreneurship and business"
                        : category === "sustainable"
                          ? "sustainable livelihood"
                          : category === "service"
                            ? "service and job-oriented courses"
                            : category === "language"
                              ? "language and communication"
                              : category === "empowerment"
                                ? "women empowerment"
                                : category}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {filteredCommunities
                .filter((community) => community.category === category)
                .map((community, index) => (
                  <Link
                    href={`/dashboard/community/${community.name.toLowerCase().replace(/\s+/g, "-")}`}
                    key={community.id}
                    className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 mr-4 relative">
                      <div className="absolute -left-2 -top-2 bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
                        <Image
                          src={
                            community.icon && community.icon !== ""
                              ? community.icon
                              : `/placeholder.svg?height=50&width=50&query=${encodeURIComponent(community.name || "Community")}`
                          }
                          alt={community.name}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{community.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{community.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{community.members}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-teal-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Join the conversation</h2>
            <p className="text-gray-600">Connect with peers and industry experts</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <BookOpen className="h-8 w-8 text-teal-600 mb-2" />
            <h3 className="font-medium mb-1">Learn from peers</h3>
            <p className="text-sm text-gray-600">Share knowledge and experiences with others in your field</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Code className="h-8 w-8 text-teal-600 mb-2" />
            <h3 className="font-medium mb-1">Get code reviews</h3>
            <p className="text-sm text-gray-600">Share your projects and get feedback from the community</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Briefcase className="h-8 w-8 text-teal-600 mb-2" />
            <h3 className="font-medium mb-1">Career opportunities</h3>
            <p className="text-sm text-gray-600">Discover job openings and networking opportunities</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-teal-100 p-3 rounded-full">
            <Lightbulb className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Featured Discussions</h2>
            <p className="text-gray-600">Hot topics from across the community</p>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {[
            {
              title: "How to prepare for a technical interview at FAANG companies?",
              community: "Interview Prep",
              comments: 42,
              likes: 128,
              time: "2 hours ago",
            },
            {
              title: "What's your favorite resource for learning React in 2023?",
              community: "Frontend Developers",
              comments: 36,
              likes: 95,
              time: "5 hours ago",
            },
            {
              title: "Career transition from marketing to UX design - my journey",
              community: "Career Transitions",
              comments: 28,
              likes: 87,
              time: "8 hours ago",
            },
            {
              title: "Free coding bootcamps for women from underserved communities",
              community: "Women in Tech",
              comments: 53,
              likes: 142,
              time: "3 hours ago",
            },
          ].map((discussion, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:border-teal-100 hover:bg-gray-50 transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-1">{discussion.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-teal-600 font-medium">{discussion.community}</span>
                <span className="mx-2">•</span>
                <span>{discussion.comments} comments</span>
                <span className="mx-2">•</span>
                <span>{discussion.likes} likes</span>
                <span className="mx-2">•</span>
                <span>{discussion.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="px-6">
            View More Discussions
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
