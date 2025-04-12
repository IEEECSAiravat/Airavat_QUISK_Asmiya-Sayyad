import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CourseProgress() {
  const courses = [
    {
      name: "Design Accessibility",
      level: "Advanced",
      hours: "5 hours",
      progress: 30,
      status: "In Progress",
      icon: "🎨",
    },
    {
      name: "UX Research",
      level: "Intermediate",
      hours: "8 hours",
      progress: 70,
      status: "In Progress",
      icon: "🔍",
    },
    {
      name: "Figma for Beginner",
      level: "Beginner",
      hours: "7 hours",
      progress: 100,
      status: "Completed",
      icon: "✏️",
    },
  ]

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                <span className="text-2xl">{course.icon}</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium leading-none">{course.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.level} • {course.hours}
                    </p>
                  </div>
                  <Badge variant={course.status === "Completed" ? "outline" : "secondary"}>
                    {course.status === "Completed" ? "✓ Completed" : "In Progress"}
                  </Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{course.progress}%</span>
                  {course.status !== "Completed" && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-teal-600">
                      Continue →
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
