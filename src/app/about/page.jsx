"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Handshake, Lightbulb, ArrowRight, Search, ShoppingBag, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutUsPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const values = [
    {
      icon: Leaf,
      title: "Sustainable Craft",
      description: "Our commitment to eco-conscious materials and ethical production.",
    },
    {
      icon: Handshake,
      title: "Transparent Process",
      description: "Building trust through open communication and honest practices.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Design",
      description: "Pushing boundaries to create functional and aesthetically pleasing products.",
    },
     {
      icon: Truck,
      title: "Delivery Time",
      description: " Our Delevery Time is- Inside Dhaka 5 days, Outside Dhaka 10 days.",
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
const products = [
  {
    name: "Signature Leather Wallet",
    description: "Embodying sustainability and minimalist design.",
    price: 89,
    image: "/images/pant/1.jpg",
    link: "/product/wallet",
  },
  {
    name: "Artisan Ceramic Mug",
    description: "Crafted with integrity, perfect for daily rituals.",
    price: 28,
    image: "/images/pant/2.jpg",
    link: "/product/mug",
  },
  {
    name: "Smart Desk Lamp",
    description: "Innovative design for a focused workspace.",
    price: 149,
    image: "/images/pant/3.jpg",
    link: "/product/lamp",
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
      <div className="relative py-14 flex items-center justify-center overflow-hidden bg-[#3A9E75] text-white">
      
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/70 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 ">
            About Us
          </h2>
           <p className="text-xl xl:text-[21px] text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Our business name is lukaz, Trade license Number is- 1230048190 
          </p>
          
          {/* <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            We design with purpose, creating timeless pieces that elevate your everyday.
          </p> */}
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
              src="/images/catImg/k1.jpg"
              alt="Our Journey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
          <motion.div variants={fadeInVariants}>
             <h3 className="text-4xl font-semibold text-[#3A9E75] mb-2 leading-tight">
             The Journey of Lukaz
            </h3>
            <p className="text-md text-gray-700 mb-6 leading-relaxed">
              Founded on the principle that true elegance lies in simplicity, MINIMAL began with a vision to create
              products that are not just beautiful.
            </p>
            <p className="text-md text-gray-700 leading-relaxed">
              Every piece in our collection tells a story of dedication – from the initial sketch to the final touch. We
              believe in building lasting relationships with our artisans and suppliers, ensuring every product you
              receive is crafted with care and integrity.
            </p>
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
          <h3 className="text-4xl font-bold text-gray-900 mb-12">Our Qualities </h3>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
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

      {/* E-commerce Touch: Products that embody our values */}
      
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-8 sm:py-12 mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16 bg-white"
      >
 <motion.div variants={fadeInVariants} className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Products That Define Us</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each item in our collection is a testament to our commitment to quality, design, and purpose.
            </p>
          </div>
 </motion.div>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {products?.map((product, index) => (
    <motion.div
      key={index}
      variants={fadeInVariants}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="w-full h-64 relative">
        <Image
          src={product?.image}
          alt={product?.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 bg-white">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
        <p className="text-gray-700 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">৳ {product.price}</span>
          <Link
            href={`/product/${product?.name}`}
            className="inline-flex items-center space-x-2 text-[#3A9E75] hover:text-[#2E8B57] transition-colors group"
          >
            <span className="text-sm font-medium">View Product</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

      </motion.section> */}

      {/* Team Section */}
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-6 lg:px-8 bg-[#E6F4EF]"
      >
        <motion.div variants={fadeInVariants} className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-12">Meet the Minds Behind Minimal</h3>
          <motion.div variants={staggerContainer} className="flex flex-wrap items-center justify-center gap-20">
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInVariants} className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg group">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{member.role}</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-gray-700 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section> */}

      {/* Call to Action */}
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-20 px-6 lg:px-8 bg-[#3A9E75] text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Experience Minimal</h3>
          <p className="text-lg text-gray-100 mb-12">
            Discover our thoughtfully designed collection and bring simplicity into your life.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-white text-[#3A9E75] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors group transform hover:scale-105"
          >
            <span className="font-medium">Shop the Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.section> */}
    </div>
  )
}
