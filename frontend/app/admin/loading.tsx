export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-xl w-12" />
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
        
        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}