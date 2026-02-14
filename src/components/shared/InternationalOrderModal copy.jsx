// "use client"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import CustomSelectInput from "./CustomSelectInput"
// import axiosInstance from "@/utils/axiosInstance"
// import toast from "react-hot-toast"
// import { findByName, findCountryName } from "@/utils/findDistrictName"
// import { useRouter } from "next/navigation"

// export default function InternationalOrderModal({ isOpen, setIsOpen, data }) {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     whatsapp: "",
//     address: "",
//     note: "",
//     country: "",
//   })
//   const [countries, setCountries]=useState([])
//   const modalRef = useRef(null)
//   const [countryId,setCountryId]=useState()


//   // fetch countries data
//   useEffect(() => {
//     const fetchCountries= async () => {
//     const {data} = await axiosInstance.get(`/countries`);  
//     setCountries(data)
//     };
//     fetchCountries();   
//   }, []);



// console.log("countries",countries)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm({ ...form, [name]: value })
//   }

//   const handleCountryChange = (value) => {
//     setForm({ ...form, country: value })
//     // get full country data by  name
//     const selectedCountry=findByName(countries,value)
//     setCountryId(selectedCountry?.id)
//   }

//   const handleSubmit = async (e)=>{
//      e.preventDefault();
  
//      const orderData={
//       payment_method:null,
//       brand_id:data?.product?.product?.brand_id,
//       item_id:data?.product?.product_id,
//       item_name:data?.product?.product?.name,
//       icon:data?.product?.color_icon,
//       slug:data?.selectedColourSlug,
//       color:data?.selectedColor,
//       size:data?.selectedSize,
//       quantity:data?.quantity,
//       country_id:countryId,
//       full_name:form?.name,
//       email:form?.email,
//       whats_app_no:form?.whatsapp,
//       full_address:form?.address,
//       note:form?.note

//      }

//   console.log("inter order place",orderData)
//   try {
//       const  response = await axiosInstance.post("/international/orders/place", orderData);

//       if(response?.data?.order_no){
//         toast.success(` Successfully Order Placed`);
//          router.push(`/international-order-success?order_id=${response?.data?.order_no}`)
//       }

//   } catch (error) {
//      toast.error(` Falid To Place Order`);
     
//   }
    

//     setIsOpen(false)
//   }

//   // close on outside click
//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         setIsOpen(false)
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleOutsideClick)
//     } else {
//       document.removeEventListener("mousedown", handleOutsideClick)
//     }
//     return () => document.removeEventListener("mousedown", handleOutsideClick)
//   }, [isOpen, setIsOpen])

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
//           <motion.div
//             ref={modalRef}
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="bg-white rounded-md max-w-md w-full shadow-md p-8"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold text-gray-900">Order Now</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-3">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   // placeholder="Your Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all text-sm"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   // placeholder="Your Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all text-sm"
//                 />
//               </div>

//               {/* WhatsApp */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   WhatsApp Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="whatsapp"
//                   // placeholder="WhatsApp Number"
//                   value={form.whatsapp}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all text-sm"
//                 />
//               </div>
//                   <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   // placeholder="WhatsApp Number"
//                   value={form.address}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all text-sm"
//                 />
//               </div>

//               {/* Country (Custom Select Input) */}
//               <CustomSelectInput
//                options={findCountryName(countries)}
//                 selectedItem={form.country}
//                 handleFunction={handleCountryChange}
//                 label="Country"
//               />

//               {/* Note */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Note
//                 </label>
//                 <textarea
//                   name="note"
//                   // placeholder="Write your note..."
//                   value={form.note}
//                   onChange={handleChange}
//                   rows={2}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all text-sm"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4 pt-1">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 bg-[#3A9E75] text-white py-2.5 rounded-md shadow-md hover:shadow-xl transition-all duration-200"
//                 >
//                  Confirm Order
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   )
// }
