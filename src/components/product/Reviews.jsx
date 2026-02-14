"use client"

import ReviewList from './ReviewList'
import AddReview from './AddReview'

// Reviews data
const reviewsData = [
  {
    id: 1,
    title: "Amazing comfort and style",
    content:
      "These shoes are incredibly comfortable for daily wear. The Air Max cushioning is perfect for long walks and the design looks great with any outfit.",
    reviewer: "Mike Johnson",
    timeAgo: "2 days ago",
    rating: 5,
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    title: "Great quality, runs true to size",
    content:
      "Excellent build quality and the sizing is accurate. I ordered my usual size and they fit perfectly. Highly recommend!",
    reviewer: "Sarah Chen",
    timeAgo: "1 week ago",
    rating: 5,
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    title: "Perfect for running",
    content:
      "I use these for my daily runs and they provide excellent support and cushioning. The React foam really makes a difference.",
    reviewer: "David Wilson",
    timeAgo: "2 weeks ago",
    rating: 4,
    verified: true,
    helpful: 15,
  },
  {
    id: 4,
    title: "Stylish and comfortable",
    content: "Love the design and they're very comfortable for all-day wear. The Air Max technology really works!",
    reviewer: "Emma Davis",
    timeAgo: "3 weeks ago",
    rating: 5,
    verified: true,
    helpful: 12,
  },
]

export default  function Reviews({reviews}) {

    // console.log("test")
  return (
    <div> 
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3A9E75]">Customer Reviews</h2>
         <AddReview/>
        </div>

          {reviews.length > 0 ?
          <ReviewList reviews={reviews}/>
          :
          <p className="text-center text-gray-700 text-lg bg-[#ECF5F1] p-3">No Reviews Found</p>
          }

       
      
        
        </div>
  )
}
