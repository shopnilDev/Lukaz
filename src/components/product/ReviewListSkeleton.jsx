"use client"

import { Star, CheckCircle2 } from "lucide-react"

export default function ReviewListSkeleton() {
  return (
    <div>
      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
            {/* Header: Stars + Verified */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-2">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="w-3 h-3 bg-gray-300 rounded"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 size={14} className="text-gray-300" />
                <span className="h-3 w-20 bg-gray-300 rounded text-xs font-medium">&nbsp;</span>
              </div>
            </div>

            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            {/* Review text */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
            </div>

            {/* Footer: User + Date */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <div className="h-12 w-40 mx-auto bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  )
}
