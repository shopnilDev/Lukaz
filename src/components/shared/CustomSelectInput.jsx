'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CustomSelectInput({ options, selectedItem, handleFunction, label }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const handleSelect = (value) => {
    handleFunction(value)
    setIsOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target )) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className="bg-white border border-gray-300 rounded-sm px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm text-gray-700">
          {selectedItem || `Select a ${label}` }
        </span>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-y-auto">
          {options?.map((option,i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#3A9E75] hover:text-white"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
