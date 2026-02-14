// "use client"

// import { useState, useEffect } from "react"
// import { Sparkles, Leaf, Handshake, Lightbulb, ArrowRight, Search, ShoppingBag } from "lucide-react"

// export default function AboutUsPage() {
//   const [isLoaded, setIsLoaded] = useState(false)

//   useEffect(() => {
//     setIsLoaded(true)
//   }, [])

//   const values = [
//     {
//       icon: Leaf,
//       title: "Sustainability",
//       description: "Committed to eco-friendly practices and materials for a better future.",
//     },
//     {
//       icon: Handshake,
//       title: "Integrity",
//       description: "Building trust through transparent processes and honest relationships.",
//     },
//     {
//       icon: Lightbulb,
//       title: "Innovation",
//       description: "Constantly exploring new ideas to bring you unique and functional designs.",
//     },
//   ]

//   const teamMembers = [
//     {
//       name: "Alex Chen",
//       role: "Founder & CEO",
//       image: "/placeholder.svg?height=300&width=300&text=Alex+Chen",
//       bio: "Visionary leader passionate about minimalist design and sustainable living.",
//     },
//     {
//       name: "Sarah Lee",
//       role: "Head of Design",
//       image: "/placeholder.svg?height=300&width=300&text=Sarah+Lee",
//       bio: "Crafting timeless pieces with a focus on form, function, and enduring quality.",
//     },
//     {
//       name: "Michael Brown",
//       role: "Operations Manager",
//       image: "/placeholder.svg?height=300&width=300&text=Michael+Brown",
//       bio: "Ensuring seamless production and delivery, from concept to your doorstep.",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       {/* Header (assuming it's part of layout.js or similar) */}
//       {/* For demonstration, a simplified header is included. In a real Next.js app, this would be in layout.js */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-light tracking-wide text-gray-900">MINIMAL</h1>
//             </div>
//             <nav className="hidden md:flex items-center space-x-12">
//               <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
//                 Shop
//               </a>
//               <a href="/about" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
//                 About
//               </a>
//               <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
//                 Contact
//               </a>
//             </nav>
//             <div className="flex items-center space-x-6">
//               {/* Simplified actions for About page */}
//               <button className="text-gray-500 hover:text-gray-900 transition-colors">
//                 <Search className="w-5 h-5" />
//               </button>
//               <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
//                 <ShoppingBag className="w-5 h-5" />
//                 {/* {cartCount > 0 && (...) } */}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative py-24 md:py-32 px-6 lg:px-8 bg-gray-50 overflow-hidden">
//         <div className="max-w-4xl mx-auto text-center">
//           <div
//             className={`transform transition-all duration-1000 ease-out ${
//               isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//             }`}
//           >
//             <h2 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight">
//               Our Story
//               <br />
//               <span className="font-normal">Behind the Brand</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               At MINIMAL, we believe in the power of simplicity and the beauty of thoughtful design. We create products
//               that enhance your everyday life, without unnecessary clutter.
//             </p>
//           </div>
//         </div>
//         {/* Subtle background animation */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <Sparkles className="w-48 h-48 text-gray-200 opacity-20 animate-pulse-slow" />
//         </div>
//       </section>

//       {/* Our Mission Section */}
//       <section className="py-20 px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//           <div
//             className={`transform transition-all duration-1000 ease-out ${
//               isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//             }`}
//           >
//             <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
//               Crafting Essentials,
//               <br />
//               Inspiring Simplicity.
//             </h3>
//             <p className="text-lg text-gray-700 mb-6 leading-relaxed">
//               Founded on the principle that less is more, MINIMAL was born from a desire to redefine modern living. We
//               meticulously design each product to serve its purpose beautifully, using only the finest materials and
//               ethical practices.
//             </p>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Our journey began with a simple idea: to create timeless pieces that bring joy and functionality without
//               overwhelming your space. We are dedicated to quality, durability, and a design philosophy that stands the
//               test of time.
//             </p>
//           </div>
//           <div
//             className={`relative overflow-hidden rounded-lg shadow-xl aspect-video transform transition-all duration-1000 ease-out ${
//               isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
//             }`}
//           >
//             <img
//               src="/placeholder.svg?height=600&width=800&text=Our+Story"
//               alt="Our Story"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values Section */}
//       <section className="py-20 px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto text-center">
//           <h3 className="text-4xl font-bold text-gray-900 mb-12">Our Core Values</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col items-center text-center p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 ${
//                   isLoaded ? "animate-fade-in" : "opacity-0"
//                 }`}
//                 style={{ animationDelay: `${index * 150}ms` }}
//               >
//                 <value.icon className="w-12 h-12 text-gray-900 mb-6" />
//                 <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
//                 <p className="text-gray-600 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h3 className="text-4xl font-bold text-gray-900 mb-12">Meet Our Team</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col items-center text-center ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
//                 style={{ animationDelay: `${index * 150}ms` }}
//               >
//                 <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg group">
//                   <img
//                     src={member.image || "/placeholder.svg"}
//                     alt={member.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <span className="text-white text-sm font-medium">{member.role}</span>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
//                 <p className="text-gray-600 text-sm mb-4">{member.role}</p>
//                 <p className="text-gray-700 leading-relaxed max-w-xs">{member.bio}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 px-6 lg:px-8 bg-gray-900 text-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-4xl font-bold mb-6">Ready to Discover?</h3>
//           <p className="text-lg text-gray-300 mb-12">
//             Explore our thoughtfully curated collection designed to simplify and elevate your everyday.
//           </p>
//           <a
//             href="/"
//             className="inline-flex items-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors group transform hover:scale-105"
//           >
//             <span className="font-medium">Shop the Collection</span>
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </a>
//         </div>
//       </section>
//     </div>
//   )
// }
