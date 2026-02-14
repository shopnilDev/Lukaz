'use client';
import React, { useState } from 'react';
import Image from 'next/image';


export default function RoundOnHoverCard({ mainImage, hoverImage, category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-xs h-96 overflow-hidden rounded-2xl shadow-lg group"
    >
      {/* Image container */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isHovered ? 'rounded-full scale-75' : 'rounded-none scale-100'
        }`}
      >
        <Image
          src={isHovered ? hoverImage : mainImage}
          alt="Product"
          fill
          className={`object-cover transition-all duration-700 ease-in-out ${
            isHovered ? 'rounded-full' : 'rounded-none'
          }`}
        />
      </div>

      {/* Buttons container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <button
          className={`bg-white text-black font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-500 ease-in-out ${
            isHovered ? 'translate-y-[-70px]' : ''
          }`}
        >
          {category}
        </button>

        <div
          className={`flex flex-col items-center gap-3 mt-3 transition-all duration-700 ease-in-out ${
            isHovered
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <button className="bg-black text-white font-medium px-4 py-1 rounded-full shadow">
            For Men
          </button>
          <button className="bg-black text-white font-medium px-4 py-1 rounded-full shadow">
            For Women
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none" />
    </div>
  );
}
