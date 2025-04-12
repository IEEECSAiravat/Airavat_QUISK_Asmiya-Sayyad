"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Calendar,
  Users,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FrontendDevelopersPage = () => {
  const [sortBy, setSortBy] = useState("hot")

  const posts = [
    {
      id: 1,
      author: "ReactMaster",
      authorAvatar: "/abstract-geometric-shapes.png",
      timeAgo: "3 hours ago",
      title:
        "TIL React 19 will include built-in support for Suspense with Server Components, eliminating the need for loading states in many cases",
      content:
        "Just discovered this in the React 19 beta docs. This is going to be a game-changer for how we handle loading states in React applications.",
      link: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023",
      upvotes: 1452,
      comments: 237,
      image: "/react-19-server-components-flow.png",
    },
    {
      id: 2,
      author: "CSSWizard",
      authorAvatar: "/abstract-colorful-swirls.png",
      timeAgo: "8 hours ago",
      title:
        "TIL you can use CSS :has() selector to style a parent element based on its children - now supported in all major browsers",
      content:
        "After years of waiting, we can finally style parent elements based on their children using the :has() selector. This has been one of the most requested features in CSS.",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has",
      upvotes: 876,
      comments: 142,
      image: "/css-selector-hierarchy.png",
    },
    {
      id: 3,
      author: "JSNinja",
      authorAvatar: "/Abstract-JN.png",
      timeAgo: "1 day ago",
      title:
        "TIL the Array.prototype.group() method is coming to JavaScript, allowing you to group array elements by a key",
      content:
        "This new method will make it much easier to group array elements without having to use reduce() or other workarounds.",
      link: "https://github.com/tc39/proposal-array-grouping",
      upvotes: 624,
      comments: 89,
      image: "/placeholder.svg?height=200&width=300&query=JavaScript+Array+group",
    },
    {
      id: 4,
      author: "AccessibilityAdvocate",
      authorAvatar: "/placeholder.svg?height=40&width=40&query=AA",
      timeAgo: "2 days ago",
      title: "TIL that 98% of the top 1 million websites fail WCAG accessibility standards in some way",
      content:
        "A recent study found that the vast majority of websites have accessibility issues. As frontend developers, we need to do better.",
      link: "https://webaim.org/projects/million/",
      upvotes: 1203,
      comments: 215,
      image: "/placeholder.svg?height=200&width=300&query=Web+Accessibility",
    },
    {
      id: 5,
      author: "PerformanceGuru",
      authorAvatar: "/placeholder.svg?height=40&width=40&query=PG",
      timeAgo: "3 days ago",
      title:
        "TIL Chrome's new 'back/forward cache' can make page navigation instant, but requires specific code optimizations",
      content:
        "Chrome's bfcache can make navigating back and forth between pages instant, but you need to avoid using certain APIs that prevent pages from being eligible.",
      link: "https://web.dev/articles/bfcache",
      upvotes: 542,
      comments: 76,
      image: "/placeholder.svg?height=200&width=300&query=Chrome+back+forward+cache",
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Main content */}
      <div className="flex-1">
        {/* Community header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 h-32 rounded-t-xl relative mb-16">
          <div className="absolute -bottom-12 left-6 bg-white p-1 rounded-full">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=80&query=Frontend%20Developers"
                alt="Frontend Developers"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute right-4 bottom-4 flex gap-3">
            <Button variant="outline" className="bg-white/90 hover:bg-white">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Follow
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Join Community</Button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Frontend Developers</h1>
          <p className="text-gray-600 mt-1">Discuss React, Vue, Angular and all things frontend</p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Users className="h-4 w-4 mr-1" />
            <span>67K members</span>
            <span className="mx-2">•</span>
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            <span>2.4K online</span>
          </div>
        </div>

        {/* Post sorting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-4">
          <Tabs defaultValue="hot" onValueChange={setSortBy} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="hot" className="text-sm">
                Hot
              </TabsTrigger>
              <TabsTrigger value="new" className="text-sm">
                New
              </TabsTrigger>
              <TabsTrigger value="top" className="text-sm">
                Top
              </TabsTrigger>
              <TabsTrigger value="rising" className="text-sm">
                Rising
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Create post button (mobile) */}
        <div className="lg:hidden mb-4">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Create Post</Button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Vote buttons */}
              <div className="flex">
                <div className="bg-gray-50 p-2 flex flex-col items-center">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ArrowUp className="h-5 w-5 text-gray-500" />
                  </button>
                  <span className="font-medium text-gray-900 my-1">{post.upvotes}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ArrowDown className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Post content */}
                <div className="p-3 flex-1">
                  {/* Author info */}
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={
                          post.authorAvatar ||
                          `/placeholder.svg?height=24&width=24&query=${encodeURIComponent(post.author)}`
                        }
                        alt={post.author}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">u/{post.author}</span>
                    <span className="mx-1 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.timeAgo}</span>
                    <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Post title */}
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h2>

                  {/* Post content */}
                  <p className="text-gray-700 mb-3">{post.content}</p>

                  {/* Post link */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline mb-3 flex items-center"
                  >
                    {post.link.replace(/(^\w+:|^)\/\//, "").split("/")[0]}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>

                  {/* Post image */}
                  {post.image && (
                    <div className="mb-3 rounded-md overflow-hidden">
                      <Image
                        src={
                          post.image || `/placeholder.svg?height=300&width=600&query=${encodeURIComponent(post.title)}`
                        }
                        alt={post.title}
                        width={600}
                        height={300}
                        className="w-full object-cover max-h-80"
                      />
                    </div>
                  )}

                  {/* Post actions */}
                  <div className="flex items-center text-gray-500">
                    <button className="flex items-center mr-4 py-1 px-2 rounded hover:bg-gray-100">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.comments} Comments</span>
                    </button>
                    <button className="flex items-center mr-4 py-1 px-2 rounded hover:bg-gray-100">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Create post button (desktop) */}
        <div className="hidden lg:block">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Create Post</Button>
        </div>

        {/* About community */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">About Community</h2>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-4">
              A community for frontend developers to share knowledge, ask questions, and discuss the latest trends and
              technologies in web development.
            </p>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Created Jan 15, 2022</span>
            </div>

            <div className="border-t border-gray-100 pt-4 pb-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">67K</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">2.4K</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Community Rules</h2>
          </div>
          <div className="p-2">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="rule-1" className="border-b-0">
                <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline">
                  <div className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Be respectful and helpful</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 px-4 pb-3">
                  Treat others with respect. No harassment, bullying, or discrimination.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rule-2" className="border-b-0">
                <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline">
                  <div className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>No self-promotion or spam</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 px-4 pb-3">
                  Don't spam the community with excessive self-promotion, affiliate links, or low-quality content.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rule-3" className="border-b-0">
                <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline">
                  <div className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Use descriptive titles</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 px-4 pb-3">
                  Post titles should clearly describe what you're sharing or asking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rule-4" className="border-b-0">
                <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline">
                  <div className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Include code examples</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 px-4 pb-3">
                  When asking for help, include relevant code examples and what you've tried so far.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rule-5" className="border-b-0">
                <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline">
                  <div className="flex items-start">
                    <span className="mr-2">5.</span>
                    <span>Credit original sources</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 px-4 pb-3">
                  When sharing content created by others, always provide proper attribution and links to the original
                  source.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Moderators */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Moderators</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32&query=JS"
                    alt="Moderator"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-teal-600">u/JavaScriptJedi</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32&query=RC"
                    alt="Moderator"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-teal-600">u/ReactChampion</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32&query=CS"
                    alt="Moderator"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-teal-600">u/CSSSuperhero</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-3 text-sm h-8">
              View All Moderators
            </Button>
          </div>
        </div>

        {/* Related communities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Related Communities</h2>
          </div>
          <div className="p-2">
            <ul>
              <li>
                <Link
                  href="/dashboard/community/react-developers"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-teal-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=32&width=32&query=React"
                      alt="React Developers"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">React Developers</p>
                    <p className="text-xs text-gray-500">42K members</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/community/javascript-experts"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-yellow-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=32&width=32&query=JS"
                      alt="JavaScript Experts"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">JavaScript Experts</p>
                    <p className="text-xs text-gray-500">38K members</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/community/web-accessibility"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-green-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=32&width=32&query=A11y"
                      alt="Web Accessibility"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Web Accessibility</p>
                    <p className="text-xs text-gray-500">22K members</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrontendDevelopersPage
