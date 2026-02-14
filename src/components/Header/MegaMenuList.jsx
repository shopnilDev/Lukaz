// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { LayoutGrid } from 'lucide-react';
// import Link from 'next/link';

// export default function MegaMenuList() {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef();

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={menuRef} className="relative inline-block text-left z-40">
//       {/* Trigger Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-[#3A9E75] p-1  rounded-md hover:bg-[#328962] transition"
//       >
//         <LayoutGrid className="text-white/90" size={23} />
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/10">
//           <div className="py-1">
//             <Link
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               T-Shirts
//             </Link>
//             <Link
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Shirts
//             </Link>
//             <Link
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Pants
//             </Link>
//             <Link
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Jackets
//             </Link>
//             <Link
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Hoodies
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
