import { BookOpen, GraduationCap, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function UserStats() {
  const stats = [
    {
      title: "Enrolled Courses",
      value: "24",
      description: "View details",
      icon: BookOpen,
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Lessons",
      value: "56",
      description: "View details",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Certificates",
      value: "17",
      description: "View details",
      icon: Award,
      color: "bg-orange-100 text-orange-700",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.color} p-2 rounded-full`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <CardDescription className="mt-1">
              <Button variant="link" className="h-auto p-0 text-sm text-teal-600">
                {stat.description}
                <span className="ml-1">→</span>
              </Button>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
