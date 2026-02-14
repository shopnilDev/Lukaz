"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axiosInstance from "@/utils/axiosInstance"
import toast from 'react-hot-toast';

export const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    review: "",
   
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isOpen, onClose])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (formData.rating === 0) newErrors.rating = "Please select a rating"
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.review.trim()) newErrors.review = "Review content is required"


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onClose()

    
    try {
      setIsSubmitting(true)
      const payload={
        product_id:1,
        rating:formData?.rating,
        title:formData?.title,
        review:formData?.review,
        user_id:1
      }

      // console.log("review submiting payload", payload);

      const res= await axiosInstance.post("/review", 
      payload,
      )

      
      toast.success(`Review Added successfully`);
      onSubmit()
      setFormData({ rating: 0, title: "", review: ""  })
      onClose()
      
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20  flex items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Your Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange("rating", star)}
                    className="transition-transform hover:scale-110"
                  >
                    <StarIcon
                      filled={star <= formData.rating}
                      className={`w-8 h-8 ${
                        star <= formData.rating ? "text-amber-400" : "text-gray-300 hover:text-amber-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Review Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* review */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Your Review *</label>
              <textarea
                value={formData.review}
                onChange={(e) => handleInputChange("review", e.target.value)}
                placeholder="Tell others about your experience with this product"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
            </div>



            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#3A9E75] text-white cursor-pointer disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
const StarIcon = ({ filled = true, className = "w-5 h-5" }) => (
  <svg
    className={`${className} ${filled ? "text-amber-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

