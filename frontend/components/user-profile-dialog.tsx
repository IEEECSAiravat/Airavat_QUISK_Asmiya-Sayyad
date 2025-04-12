"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserProfileDialog({ open, onOpenChange }: UserProfileDialogProps) {
  const completedCourses = [
    {
      name: "Figma for Beginner",
      category: "Design",
      completedDate: "March 15, 2025",
    },
    {
      name: "HTML & CSS Fundamentals",
      category: "Web Development",
      completedDate: "February 28, 2025",
    },
    {
      name: "JavaScript Basics",
      category: "Programming",
      completedDate: "January 20, 2025",
    },
  ]

  const inProgressCourses = [
    {
      name: "Design Accessibility",
      category: "Design",
      progress: 30,
    },
    {
      name: "UX Research",
      category: "Design",
      progress: 70,
    },
  ]

  const skills = [
    { name: "UI Design", level: 85 },
    { name: "UX Research", level: 70 },
    { name: "Prototyping", level: 60 },
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 65 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Your learning progress and achievements</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
              <img src="/thoughtful-woman-profile.png" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <h2 className="text-xl font-bold">Alesia Karapova</h2>
            <p className="text-muted-foreground">Basic Member</p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">Design Enthusiast</Badge>
              <Badge variant="outline">Web Developer</Badge>
            </div>
          </div>

          {/* Course Completion Summary */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Course Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">60%</p>
                  <p className="text-sm text-muted-foreground">Overall</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">{skill.level}%</p>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Courses */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Completed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedCourses.map((course, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.category}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{course.completedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* In Progress Courses */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressCourses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.category}</p>
                      </div>
                      <p className="text-sm font-medium">{course.progress}%</p>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
