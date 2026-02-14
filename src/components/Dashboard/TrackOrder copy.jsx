// "use client"

// import { Icon } from "@iconify/react"

// export default function TrackOrder({setShowTrackOrder}) {
 

//   // Demo order tracking data
//   const trackingSteps = [
//     { label: "Ordered",
//       status:"Pending",
//      date: "16 Aug 2025 09:43pm", icon: <Icon icon="uil:cart" width="36" height="36" /> },
//     { label: "Order Ready",status:"Pending",
//       date: "16 Aug 2025 09:43pm", icon: <Icon icon="uil:cart" width="36" height="36" /> },
//     { label: "Shipped",status:"Pending",
//        date: "Nov 21", icon: <Icon icon="uil:cart" width="36" height="36" /> },
//     { label: "Out for Delivery",status:"Pending",
//        date: "Nov 21", icon: <Icon icon="uil:cart" width="36" height="36" /> },
//     { label: "Delivered",status:"Pending",
//        date: "Nov 22", icon: <Icon icon="uil:cart" width="36" height="36" /> },
//   ]

//   const currentStep = 1 // demo: "Out for Delivery"

//   return (
//     <div className=" flex items-center justify-center mt-4">
//       <div className=" w-full ">
//         {/* Timeline */}
//         <div className="relative border-l-2 border-gray-200 ml-5">
//           {trackingSteps.map((step, index) => {
//             const isCompleted = index <= currentStep
//             return (
//               <div key={index} className="flex gap-20  mb-8 ml-4">
//                 <div
//                   className={`absolute -left-8 w-14 h-14 flex items-center justify-center rounded-full border-2 
//                   ${isCompleted ? "bg-[#3A9E75] border-[#3A9E75] text-white" : "border-gray-300 text-gray-400"}`}
//                 >
//                   {step.icon}
//                 </div>
//                 <div className="ml-4">
//                   <p className={`font-medium ${isCompleted ? "text-[#3A9E75]" : "text-gray-500"}`}>
//                   {step.label}
//                 </p>
//                  <p className="text-sm text-gray-500">{step.status}</p>
//                 <p className="text-sm text-gray-500">{step.date}</p>
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Back Button */}
//         <button
//           onClick={() =>setShowTrackOrder(false) }
//           className="mt-6 w-full py-2 bg-[#3A9E75] text-white rounded-md font-semibold hover:bg-[#338b65]"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   )
// }
