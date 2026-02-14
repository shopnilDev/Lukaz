"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {    FileText,  ReceiptText, Info,  ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TermsAndConditions() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const terms = [
    {
      icon: ReceiptText,
      title: "Acceptance of Terms",
      description: "By accessing this site, you confirm that you are at least 18 years old or accessing under the supervision of a parent or legal guardian.",
    },
    {
       icon: Info,
      title: "Product Information",
      description: "We strive for accuracy in product descriptions, pricing, and availability. However, we do not guarantee that all information is free from error.",
    },
    {
      icon: ShoppingCart,
      title: "Orders & Payments",
      description: "All orders placed are subject to acceptance and product availability. Payment must be made in full before shipping.",
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
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
     

      {/* Hero Section */}
      <div className="relative  flex items-center 
      justify-center overflow-hidden bg-[#3A9E75] text-white py-14">
        <div className="absolute inset-0 
        bg-gradient-to-t from-[#2E8B57]/70 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
    <div className="max-w-3xl mx-auto text-white">
          <FileText className="mx-auto mb-4 text-white" size={60} />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Terms & Conditions</h1>
         
          <p className="mt-6  leading-relaxed max-w-2xl mx-auto">
         By accessing or using our website, you agree to comply with these Terms &
            Conditions. Please read them carefully before using our services.
          </p>
        </div>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-8 sm:py-12  px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeInVariants}
            className="relative overflow-hidden rounded-lg shadow-xl aspect-video group"
          >
            <img
              src="/images/others/terms.jpg"
              alt="Our Journey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <h3 className="text-4xl font-semibold text-[#3A9E75] mb-2 leading-tight">
             Use of Website
            </h3>
              <div className="">
         <p className="text-gray-600 font-semibold leading-relaxed mb-4">
             You agree to use this website only for lawful purposes and in a manner
            that does not infringe the rights of others, restrict, or inhibit their use.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
            <li>No fraudulent, abusive, or unlawful activity is permitted.</li>
            <li>Content must not violate intellectual property rights.</li>
            <li>Attempts to disrupt or hack our systems are strictly prohibited.</li>
          </ul>
        </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values Section - More interactive */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-8 sm:py-12  bg-[#E6F4EF]"
      >
        <motion.div variants={fadeInVariants} className="mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-12"> Our Terms & Conditions</h3>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {terms.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="flex flex-col items-center text-center py-8 px-6 rounded-xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-6 group-hover:bg-[#3A9E75] transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-[#3A9E75] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

    

     
    </div>
  )
}
