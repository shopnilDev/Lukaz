"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Demo API data - simulating what would come from an API
const apiData = {
  overallRating: {
    score: 4.6,
    totalReviews: 86299,
    starDistribution: {
      5: 72450,
      4: 8630,
      3: 3219,
      2: 1200,
      1: 800,
    },
    trustpilotVerified: true,
  },
  reviews: [
    {
      id: 1,
      title: "Great price and came the next day",
      content:
        "Great price and came the next day (on a Saturday after order late on the Friday), would definitely recommend",
      reviewer: {
        name: "customer",
        verified: true,
        location: "UK",
      },
      rating: 5,
      timeAgo: "3 hours ago",
      helpful: 12,
      productPurchased: "Wireless Headphones",
      verified: true,
    },
    {
      id: 2,
      title: "Quality of choice",
      content:
        "Quality of choice, especially as I have 13 answers half feet. The product exceeded my expectations in every way.",
      reviewer: {
        name: "Simon Stockwin",
        verified: true,
        location: "London",
      },
      rating: 5,
      timeAgo: "4 hours ago",
      helpful: 8,
      productPurchased: "Running Shoes",
      verified: true,
    },
    {
      id: 3,
      title: "good product",
      content: "good product, good price, quick delivery. Will definitely order again from this store.",
      reviewer: {
        name: "B Raynor",
        verified: true,
        location: "Manchester",
      },
      rating: 5,
      timeAgo: "5 hours ago",
      helpful: 15,
      productPurchased: "Smartphone Case",
      verified: true,
    },
    {
      id: 4,
      title: "Fantastic products at a reasonable price",
      content:
        "Fantastic products at a reasonable price. The new returns policy is fantastic when customers need to return items.",
      reviewer: {
        name: "Dec Adair",
        verified: true,
        location: "Birmingham",
      },
      rating: 5,
      timeAgo: "6 hours ago",
      helpful: 22,
      productPurchased: "Laptop Stand",
      verified: true,
    },
    {
      id: 5,
      title: "Excellent communication",
      content:
        "Excellent communication, well packaged quality item quick delivery first class would definitely recommend to others.",
      reviewer: {
        name: "Richard",
        verified: true,
        location: "Leeds",
      },
      rating: 5,
      timeAgo: "6 hours ago",
      helpful: 18,
      productPurchased: "Bluetooth Speaker",
      verified: true,
    },
    {
      id: 6,
      title: "Outstanding service",
      content:
        "Outstanding service and product quality. Will definitely order again in the future. Customer service was very helpful.",
      reviewer: {
        name: "Sarah Johnson",
        verified: true,
        location: "Liverpool",
      },
      rating: 5,
      timeAgo: "7 hours ago",
      helpful: 25,
      productPurchased: "Fitness Tracker",
      verified: true,
    },
    {
      id: 7,
      title: "Fast delivery and great quality",
      content:
        "Fast delivery and great quality products. The packaging was excellent and everything arrived in perfect condition.",
      reviewer: {
        name: "Mike Thompson",
        verified: true,
        location: "Glasgow",
      },
      rating: 5,
      timeAgo: "8 hours ago",
      helpful: 14,
      productPurchased: "Gaming Mouse",
      verified: true,
    },
    {
      id: 8,
      title: "Highly recommended store",
      content:
        "Highly recommended store with competitive prices and excellent customer service. Very satisfied with my purchase.",
      reviewer: {
        name: "Emma Wilson",
        verified: true,
        location: "Edinburgh",
      },
      rating: 5,
      timeAgo: "9 hours ago",
      helpful: 31,
      productPurchased: "Tablet Cover",
      verified: true,
    },
  ],
  companyInfo: {
    name: "TechStore",
    trustpilotUrl: "https://trustpilot.com/techstore",
    established: "2018",
    totalOrders: 150000,
  },
}

const StarIcon = ({ filled = true, className = "w-4 h-4" }) => (
  <svg
    className={`${className} ${filled ? "text-green-500" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const VerifiedIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-gray-500`} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const TrustpilotLogo = () => (
  <div className="flex items-center gap-1">
    <StarIcon className="w-4 h-4" />
    <span className="text-sm font-semibold text-gray-700">Trustpilot</span>
  </div>
)

const ReviewCard = ({ review }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
    {/* Stars and Verified Badge */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>
      {review.verified && (
        <div className="flex items-center gap-1 text-gray-500">
          <VerifiedIcon />
          <span className="text-xs">Verified</span>
        </div>
      )}
    </div>

    {/* Review Title */}
    <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight line-clamp-2">{review.title}</h3>

    {/* Review Content */}
    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">{review.content}</p>

    {/* Product Info */}
    {review.productPurchased && (
      <div className="text-xs text-gray-500 mb-2">
        Product: <span className="font-medium">{review.productPurchased}</span>
      </div>
    )}

    {/* Reviewer Info */}
    <div className="text-xs text-gray-500 mt-auto">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium">{review.reviewer.name}</span>
          {review.reviewer.location && <span className="ml-1">• {review.reviewer.location}</span>}
        </div>
        <span>{review.timeAgo}</span>
      </div>
      {review.helpful > 0 && <div className="mt-1 text-green-600">{review.helpful} people found this helpful</div>}
    </div>
  </div>
)

// Simulate API call
const fetchReviewData = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return apiData
}

export default function RatingSlider() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const reviewData = await fetchReviewData()
        setData(reviewData)
      } catch (error) {
        console.error("Error fetching review data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 h-48">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        <div className="text-center text-gray-500">Failed to load reviews. Please try again later.</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Main Slider */}
      <div className="relative mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="reviews-swiper"
        >
          {data.reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Rating Summary */}
      <div className="text-center mb-6">
        <p className="text-gray-700 text-sm">
          Rated <span className="font-semibold">{data.overallRating.score}</span> / 5 based on{" "}
          <span className="font-semibold">{data.overallRating.totalReviews.toLocaleString()}</span> reviews. Showing our
          5 star reviews.
        </p>
        <div className="mt-2">
          <TrustpilotLogo />
        </div>
      </div>

      {/* Bottom Trustpilot Banner */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-lg font-semibold text-gray-900">Excellent</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="text-gray-700">{data.overallRating.totalReviews.toLocaleString()} reviews on</span>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="font-semibold text-gray-900">Trustpilot</span>
          </div>
        </div>

        {/* Additional Company Info */}
        <div className="text-center mt-3 text-xs text-gray-500">
          {data.companyInfo.name} • Established {data.companyInfo.established} •
          {data.companyInfo.totalOrders.toLocaleString()}+ orders delivered
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .reviews-swiper .swiper-pagination {
          bottom: -40px !important;
        }
        
        .reviews-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
        }
        
        .reviews-swiper .swiper-pagination-bullet-active {
          background: #10b981;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
