"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import ReviewListSkeleton from "./ReviewListSkeleton";

export default function ReviewList({ reviews }) {
  const INITIAL_COUNT = 1; // Initial number of reviews to show
  const LOAD_MORE_COUNT = 1; // Number of reviews to load each time

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Slice the reviews to display only the required number
  const visibleReviews = reviews?.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-6">
        {visibleReviews?.map((review, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
            {/* Header: Rating + Verified */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className={
                      idx < review?.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 size={14} />
                <span className="text-xs font-medium">Verified Registered</span>
              </div>
            </div>

            {/* Review Title & Body */}
            <h4 className="font-semibold text-gray-900 mb-2">{review?.title}</h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {review?.review.slice(0,100)}
            </p>

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
            </div>
          </div>
        ))}
      </div>

      {/* Load More & Show Less Buttons */}
      <div className="text-center mt-8 space-x-4">
        {visibleCount < reviews.length && (
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Load More Reviews
          </button>
        )}

        {visibleCount > INITIAL_COUNT && (
          <button
            onClick={handleShowLess}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
