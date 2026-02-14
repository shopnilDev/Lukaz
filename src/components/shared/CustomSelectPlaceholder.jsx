'use client'

export default function CustomSelectPlaceholder({ label, message }) {
  return (
    <div className="relative w-full opacity-70 cursor-not-allowed">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="bg-gray-100 border border-gray-300 rounded-sm px-3 py-2 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {message || `Loading ${label}...`}
        </span>
      </div>
    </div>
  )
}
