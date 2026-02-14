"use client";

import { getImageUrl } from "@/utils/helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Brands({ brands }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          <span className="relative inline-block">
            <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#3A9E75] rounded-md opacity-40"></span>
            <span className="relative">Our</span>
          </span>{" "}
          Brands
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-lg mx-auto">
          Discover top brands offering quality products tailored to your needs.
        </p>
      </div>

      {/* Brands Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {brands?.map((brand) => (
          <motion.div
            key={brand.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl
                       transition-all duration-300 overflow-hidden group flex flex-col items-center text-center py-6"
          >

            <Link
            href={`/shop?brands=${brand?.slug}`}
            >
                {/* Logo Section */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-50 border
             border-gray-100 overflow-hidden group-hover:scale-105 transition-transform 
             duration-300">
              <Image
                src={getImageUrl("brand", brand?.thumbnail)}
                alt={brand?.name}
                fill
                className="object-contain rounded-full p-2 "
              />
            </div>

            {/* Brand Info */}
            <div className="mt-5">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#3A9E75] transition-colors">
                {brand?.name}
              </h2>
              {brand?.description && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {brand?.description}
                </p>
              )}
            </div>

            {/* Decorative Bottom Bar */}
            <div className="mt-5 w-16 h-1 bg-[#3A9E75] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                
            </div>

            </Link>
          

          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
