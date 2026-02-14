"use client"

import { Star, CheckCircle2 } from "lucide-react"

export const ReviewCard = ({ review }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    {/* Header: Rating + Verified */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < review?.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 text-green-600">
        <CheckCircle2 size={16} />
        <span className="text-xs font-medium">Verified Registered</span>
      </div>
    </div>

    {/* Review Content */}
    <h4 className="font-semibold text-gray-900 mb-2">{review?.title}</h4>
    <p className="text-gray-700 text-sm leading-relaxed mb-4">{review?.review}</p>

    {/* Footer: User + Date */}
    <div className="flex items-center justify-between text-xs text-gray-500">
      <div>
        <span className="font-medium">{review?.user?.name}</span> •{" "}
        {new Date(review?.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="text-green-600">👍 Helpful</div>
    </div>
  </div>
)
