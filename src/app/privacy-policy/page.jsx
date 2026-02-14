"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {  Handshake, Lightbulb, ShieldCheck,  Database, Cookie } from "lucide-react"


export default function PrivacyPolicy() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const policies = [
    {
      icon: Database,
      title: "Information We Collect",
      description: "We may collect information that you provide directly to us when you register, subscribe, or interact with our services. This includes:",
    },
    {
       icon: Cookie,
      title: "Cookies",
      description: "We use cookies and similar technologies to enhance your browsing experience, remember preferences, and analyze site traffic. You can disable cookies through your browser settings, but some features may not function properly.",
    },
    {
        icon: Handshake,
   
      title: "Third-Party Services",
      description: "We may share your information with trusted third-party providers who help us run our business. These partners are required to keep your data secure and only use it for authorized purposes.",
    },
  ]

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "/images/catImg/m1.jpg",
    },
    {
      name: "Sarah Lee",
      role: "Head of Design",
      image: "/images/catImg/w1.jpg",
    },
    {
      name: "Michael Brown",
      role: "Operations Lead",
      image: "/images/catImg/shirt2.webp",
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
          <ShieldCheck className="mx-auto mb-4 text-white" size={60} />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
         
          <p className="mt-6  leading-relaxed max-w-2xl mx-auto">
            We respect your privacy and are committed to protecting your personal data.
            This policy explains how we handle your information when you use our website and services.
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
        className="py-8 sm:py-12 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeInVariants}
            className="relative overflow-hidden rounded-lg shadow-xl aspect-video group"
          >
            <img
              src="/images/others/privacy.avif"
              alt="Our Journey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <h3 className="text-4xl font-semibold text-[#3A9E75] mb-2 leading-tight">
             How We Use Your Information
            </h3>
              <div className="">
         <p className="text-gray-600 font-semibold leading-relaxed mb-4">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
    <li>Provide, operate, and improve our services.</li>
            <li>Process secure transactions.</li>
            <li>Send service-related updates and promotions.</li>
            <li>Ensure website security and prevent fraud.</li>
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
          <h3 className="text-4xl font-bold text-gray-900 mb-12"> Our Privacy and Policy</h3>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policies.map((value, index) => (
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
