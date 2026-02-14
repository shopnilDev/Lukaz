"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { timeAgo } from "@/utils/timeAgo"

// Demo data for ratings
const reviewsData = [
  {
    id: 1,
    title: "Great price and came the next day",
    content:
      "Great price and came the next day (on a Saturday after order late on the Friday), would definitely recommend",
    reviewer: "customer",
    timeAgo: "3 hours ago",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    title: "Quality of choice",
    content: "Quality of choice, especially as I have 13 answers half feet",
    reviewer: "Simon Stockwin",
    timeAgo: "4 hours ago",
    rating: 4,
    verified: true,
  },
  {
    id: 3,
    title: "good product",
    content: "good product, good price, quick delivery",
    reviewer: "B Raynor",
    timeAgo: "5 hours ago",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    title: "Fantastic products at a reasonable price",
    content: "Fantastic products at a reasonable price. The new returns policy is fantastic when customers",
    reviewer: "Dec Adair",
    timeAgo: "6 hours ago",
    rating: 4,
    verified: true,
  },
  {
    id: 5,
    title: "Excellent communication",
    content:
      "Excellent communication, well packaged quality item quick delivery first class would definitely recommend",
    reviewer: "Richard",
    timeAgo: "6 hours ago",
    rating: 5,
    verified: true,
  },
  {
    id: 6,
    title: "Outstanding service",
    content: "Outstanding service and product quality. Will definitely order again in the future.",
    reviewer: "Sarah Johnson",
    timeAgo: "7 hours ago",
    rating: 5,
    verified: true,
  },
]

const StarIcon = ({ filled = true }) => (
  <svg className={`w-4 h-4 ${filled ? "text-green-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const VerifiedIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const TrustpilotLogo = () => (
  <div className="flex items-center gap-1">
    <StarIcon />
    <span className="text-sm font-semibold text-gray-700">Trustpilot</span>
  </div>
)


const ReviewCard = ({ review }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[160px] flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <div className="flex gap-1">
        {[...Array(review?.rating)].map((_, i) => (
          <StarIcon key={i} filled={i < review?.rating} />
        ))}
      </div>
    
        <div className="flex items-center gap-1 text-gray-500">
          <VerifiedIcon />
          <span className="text-xs">Verified</span>
        </div>
    
    </div>

    <h3
      className="font-semibold text-gray-900 mb-2 text-sm leading-tight truncate"
      title={review?.title}
    >
      {review?.title.length > 30 ? review?.title.slice(0, 30) + '...' : review?.title}
    </h3>

    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow"
     title={review?.review}
    >
      {review?.review.length > 55 ? review?.review.slice(0, 55) + '..' : review?.review}
    </p>

    <div className="text-xs text-gray-500 mt-auto">
      <span className="font-medium">{review?.user?.name}</span>, {timeAgo(review?.created_at)}
    </div>
  </div>
);


export default function RatingSlider({reviews}) {
  return (
    <div className="pt-6 md:pt-8 px-6 pb-6 bg-gray-50">
      {/* Main Slider */}
      <div className="relative mb-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {reviews?.reviews?.map((review) => (
            <SwiperSlide key={review?.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed -left-5">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="custom-next absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed -right-5">
          <svg className="w-5 h-5 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Rating Summary */}
      <div className=" flex flex-col justify-center items-center gap-2 text-center mb-6">
        <p className="text-gray-700 text-sm">
          Rated <span className="font-semibold">{reviews?.avarage ? <span>{parseFloat(reviews?.avarage).toFixed(1) }</span>:"0"} </span> / 5 based on <span className="font-semibold">{reviews?.all_rattings}</span>{" "}
          reviews. Showing our 5 star reviews.
        </p>
        <div className="mt-2">
          {/* <TrustpilotLogo /> */}
          
        </div>
      </div>

      {/* Bottom Trustpilot Banner */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 md:gap-4">
          <span className="text-lg font-semibold text-gray-900">Excellent</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="text-gray-700">{reviews?.all_rattings} reviews on all products</span>
          <div className="flex items-center gap-1">
            {/* <StarIcon /> */}
            {/* <span className="font-semibold text-gray-900">Trustpilot</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}
