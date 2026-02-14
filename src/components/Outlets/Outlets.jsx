"use client"

import Container from "@/components/shared/Container"
import { getImageUrl } from "@/utils/helpers"
import { motion } from "framer-motion"
import Image from "next/image"

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function Outlets({ outlets }) {
  return (
    <Container className="py-9 sm:py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6"
      >
        <span className="pb-1">Our</span> Outlets
      </motion.h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Visit any of our outlets across the country to experience our world-class service and premium collections.
      </p>

      {/* Outlets Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {outlets?.map((outlet, idx) => (
          <motion.div
            key={idx}
            variants={fadeInVariants}
            className="bg-white rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Branch Image */}
            <div className="relative w-full h-90 bg-green-200">
              <Image
                src={getImageUrl("branch", outlet?.image) || "/placeholder.svg"}
                alt={outlet?.name}
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{outlet?.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{outlet?.address}</p>
              <p className="text-gray-700 font-medium text-sm mt-2">{outlet?.contact}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  )
}
