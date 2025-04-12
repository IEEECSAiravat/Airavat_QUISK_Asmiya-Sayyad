import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecommendedCourses() {
  const courses = [
    {
      title: "Design Workshop Facilitation",
      description: "Master your skills in design workshop facilitation and learn how to promote collaboration",
      level: "Advanced",
      hours: "6 hours",
      rating: "4.9",
      reviews: "1,890",
      color: "bg-teal-700",
      icon: "📚",
    },
    {
      title: "Animation for Beginner",
      description:
        "Procreate Dreams has transformed my ability to make animations from my art. Yet when I first opened...",
      level: "Beginner",
      hours: "6 hours",
      rating: "4.9",
      reviews: "1,890",
      color: "bg-amber-500",
      icon: "🎬",
    },
    {
      title: "Common Design Pattern",
      description:
        "Master your skills in design workshop facilitation and learn how to promote collaboration and find...",
      level: "Intermediate",
      hours: "6 hours",
      rating: "4.9",
      reviews: "1,890",
      color: "bg-blue-600",
      icon: "🧩",
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recommended for you</h2>
        <Button variant="outline" size="sm">
          See All
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Card key={index} className="overflow-hidden bg-white">
            <div className={`${course.color} p-8 flex justify-center items-center`}>
              <span className="text-4xl">{course.icon}</span>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {course.level} • {course.hours}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-500 mr-1">★</span>
                  <span>{course.rating}</span>
                  <span className="text-muted-foreground ml-1">({course.reviews})</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
