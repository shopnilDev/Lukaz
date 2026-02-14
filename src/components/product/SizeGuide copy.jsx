// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';

//   const sizes = [
//     { us: 8, uk: 7, cm: 26 },
//     { us: 9, uk: 8, cm: 27 },
//     { us: 10, uk: 9, cm: 28 },
//     { us: 11, uk: 10, cm: 29 },
//     { us: 12, uk: 11, cm: 30 },
//     { us: 13, uk: 12, cm: 31 },
//     { us: 14, uk: 13, cm: 32 },
//   ]

// const SizeModal = ({
//   isOpen,
//   onClose,

 
// }) => {
//   const modalRef = useRef(null);
//   // Close modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/20  z-50 flex items-center justify-center p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             ref={modalRef}
//             className="bg-white rounded-md max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="p-6">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">Size Guide</h3>
//            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

        

//            <div className="overflow-x-auto rounded-md border border-gray-200">
//       <table className="min-w-full text-center text-sm text-gray-800">
//         <thead>
//           <tr>
//             <th className="bg-[#a5e8cc] px-4 py-4 font-semibold rounded-tl-md">US</th>
//             {sizes.map((size, idx) => (
//               <th
//                 key={idx}
//                 className={`px-6 py-4 ${idx % 2 !== 0 ? 'bg-[#a5e8cc]' : 'bg-white'}`}
//               >
//                 {size.us}
//               </th>
//             ))}
//             <th className="bg-[#a5e8cc] rounded-tr-md" />
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="bg-[#a5e8cc] font-medium py-4">UK</td>
//             {sizes.map((size, idx) => (
//               <td
//                 key={idx}
//                 className={`py-4 ${idx % 2 !== 0 ? 'bg-[#a5e8cc]' : 'bg-white'}`}
//               >
//                 {size.uk}
//               </td>
//             ))}
//             <td className="bg-[#a5e8cc]" />
//           </tr>
//           <tr>
//             <td className="bg-[#a5e8cc] font-medium py-4 rounded-bl-md">cm</td>
//             {sizes.map((size, idx) => (
//               <td
//                 key={idx}
//                 className={`py-4 ${idx % 2 !== 0 ? 'bg-[#a5e8cc]' : 'bg-white'}`}
//               >
//                 {size.cm}
//               </td>
//             ))}
//             <td className="bg-[#a5e8cc] rounded-br-md" />
//           </tr>
//         </tbody>
//       </table>
//     </div>


//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SizeModal;
