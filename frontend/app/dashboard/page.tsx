import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserStats } from "@/components/user-stats"
import { CourseProgress } from "@/components/course-progress"
import { RecommendedCourses } from "@/components/recommended-courses"

export default function DashboardPage() {
  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alesia 👋</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UserStats />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CourseProgress />
        </div>
        <div className="md:col-span-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/thoughtful-woman-profile.png"
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Alesia Karapova</h3>
                <p className="text-sm text-muted-foreground">Basic Member</p>

                <div className="mt-6 w-full">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">30</span>
                    <span className="text-sm text-muted-foreground">This week</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Hours spent</p>

                  <div className="mt-4 grid grid-cols-7 gap-1">
                    {[15, 20, 8, 25, 18, 10, 22].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-8 bg-teal-600" style={{ height: `${value * 2}px`, maxHeight: "60px" }}></div>
                        <span className="mt-1 text-xs text-muted-foreground">
                          {index === 0 ? "Sun" : index === 6 ? "Sat" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RecommendedCourses />
    </div>
  )
}
