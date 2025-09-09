import { Skeleton } from "../ui/Skeleton";

export function FeaturedPostSkeleton() {
  return (
    <div className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3">
        <div className="flex items-center">
          <Skeleton className="w-5 h-5 mr-2 rounded-full bg-white/40" />
          <Skeleton className="h-4 w-24 bg-white/40 rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Texte côté gauche */}
          <div>
            <div className="flex items-center mb-4">
              <Skeleton className="w-4 h-4 mr-2 rounded-full bg-indigo-200" />
              <Skeleton className="h-6 w-28 bg-indigo-100 rounded-full" />
            </div>
            <Skeleton className="h-7 w-3/4 mb-4 rounded-md" />
            <Skeleton className="h-7 w-2/3 mb-4 rounded-md" />
            <Skeleton className="h-7 w-1/2 mb-6 rounded-md" />

            <Skeleton className="h-11 w-44 rounded-xl bg-gradient-to-r from-indigo-200 to-blue-200" />
          </div>

          {/* Image côté droit */}
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
