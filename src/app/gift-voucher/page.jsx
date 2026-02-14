"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Gift, Tag, Clock } from "lucide-react"

export default function GiftVoucher() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const vouchers = [
    {
      id: 1,
      title: "৳500 Gift Voucher",
      description: "Perfect for birthdays and special occasions. Redeemable on any product.",
      expiry: "Valid until: 31 Dec 2025",
      image: "/images/vouchers/7.jpg",
    },
    {
      id: 2,
      title: "৳1000 Gift Voucher",
      description: "Ideal for friends and family. Can be used across all categories.",
      expiry: "Valid until: 31 Jan 2026",
      image: "/images/vouchers/3.jpg",
    },
    {
      id: 3,
      title: "৳2000 Gift Voucher",
      description: "Make someone’s day extra special with this premium gift voucher.",
      expiry: "Valid until: 15 Mar 2026",
      image: "/images/vouchers/4.jpg",
    },
      {
      id: 4,
      title: "৳1000 Gift Voucher",
      description: "Ideal for friends and family. Can be used across all categories.",
      expiry: "Valid until: 31 Jan 2026",
      image: "/images/vouchers/3.jpg",
    },
  ]

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#3A9E75] text-white py-14">
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/70 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
             <Gift className="mx-auto mb-4 text-white" size={60} />
        
          <h1 className="text-4xl md:text-5xl font-bold text-white">Gift Vouchers</h1>
          <p className="mt-6 leading-relaxed max-w-2xl mx-auto">
            Surprise your loved ones with our exclusive gift vouchers.  
            Choose from different values and let them pick their favorite items.
          </p>
        </motion.div>
      </div>

      {/* Voucher Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-8 sm:py-12  bg-[#E6F4EF]"
      >
        <motion.div variants={fadeInVariants} className="mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16">
          {/* <h3 className="text-4xl font-bold text-center text-gray-900 mb-8">Available Gift Vouchers</h3> */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {vouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                variants={fadeInVariants}
                className="bg-white rounded-md shadow-lg hover:shadow-xl
                 transition-all duration-300 overflow-hidden group"
              >
                <div className=" w-full h-42 overflow-hidden">
                  <img
                    src={voucher.image}
                    alt={voucher.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                </div>
                <div className="p-4 text-center space-y-2">
                 
                  <h4 className="text-md font-semibold text-[#3A9E75]">{voucher.title}</h4>
                  {/* <p className="text-gray-600 mt-3 text-sm">{voucher.description}</p> */}
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Clock size={14} /> {voucher.expiry}
                  </p>
                  {/* <button className="mt-2 text-sm px-5 py-1.5 bg-[#3A9E75] text-white rounded-lg hover:bg-[#2E8B57] transition-colors">
                    Buy Now
                  </button> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}
