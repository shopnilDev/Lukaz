"use client"

import React, { useState } from 'react'
import { AddReviewModal } from '../shared/AddReviewModal'

export default  function AddReview() {
const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const handleReviewSubmit = () => {
    setIsReviewModalOpen(false)
  }

  return (
    <div>
         <button
         onClick={() => setIsReviewModalOpen(true)}
          className="text-[#3A9E75] hover:text-[#56a584] cursor-pointer font-medium"
            >
             Write a Review
         </button>
          <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  )
}
