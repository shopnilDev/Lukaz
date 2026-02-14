"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ColorModal = ({ isOpen, onClose, colors, selectedColor, onColorSelect }) => {
  const modalRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target )) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Select Color</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Color Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {colors.map((colorOption) => (
                  <button
                    key={colorOption}
                    onClick={() => onColorSelect(colorOption)}
                    className={`p-3 border rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2
                      ${
                        selectedColor === colorOption
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400 text-gray-800"
                      }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: colorOption.toLowerCase() }}
                    ></span>
                    {colorOption}
                  </button>
                ))}
              </div>

              {/* Confirm Button */}
              <button
                onClick={onClose}
                disabled={!selectedColor}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {selectedColor ? `Select Color ${selectedColor}` : "Choose a Color"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ColorModal
