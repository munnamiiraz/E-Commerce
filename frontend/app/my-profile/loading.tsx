export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header Skeleton */}
        <div className="bg-white rounded-3xl overflow-hidden mb-8 animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="px-8 pb-8">
            <div className="flex items-end gap-6 -mt-20">
              <div className="w-40 h-40 bg-gray-300 rounded-3xl" />
              <div className="flex-1 space-y-4 mt-24">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Skeleton */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-xl w-12" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        
        {/* Content Skeleton */}
        <div className="bg-white rounded-2xl p-8 space-y-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}