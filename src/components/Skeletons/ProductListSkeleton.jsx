import React from 'react'

export default function ProductListSkeleton() {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((product,i) => (
                <div 
                key={i}
                className="bg-white rounded-sm overflow-hidden shadow-sm animate-pulse">
                      {/* Image Placeholder */}
                      <div className="relative w-full h-80 bg-gray-200" />

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        {/* Brand */}
                        <div className="h-3 w-20 bg-gray-200 rounded" />

                        {/* Product Name */}
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />

                        {/* Price and Colors */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="h-4 w-16 bg-gray-200 rounded" />
                          <div className="h-4 w-12 bg-gray-200 rounded" />
                        </div>
                      </div>
                 </div>
    
              ))}
            </div>
  )
}
