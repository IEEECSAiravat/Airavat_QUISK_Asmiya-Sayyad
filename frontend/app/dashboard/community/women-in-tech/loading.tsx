import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="relative">
        <Skeleton className="h-32 md:h-48 w-full" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20 relative z-10 pb-4 md:pb-6">
            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-6" />

            {/* Post Skeletons */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4">
                <Skeleton className="h-64 w-full mb-4" />
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-80 space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
