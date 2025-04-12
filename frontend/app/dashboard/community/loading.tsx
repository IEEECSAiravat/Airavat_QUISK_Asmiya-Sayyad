import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Skeleton className="h-12 w-full mb-8" />

      <div className="mb-8">
        <Skeleton className="h-10 w-full max-w-md mb-6" />
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-4 w-96 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start p-4 bg-white rounded-lg border border-gray-200">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
        </div>
      </div>

      <Skeleton className="h-64 w-full mb-8 rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  )
}
