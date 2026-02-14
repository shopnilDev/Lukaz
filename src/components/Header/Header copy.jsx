// "use client"
// import { useContext, useEffect, useRef, useState } from "react"
// import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight, LogIn, Info, InfoIcon, BadgeInfoIcon, LogOut } from "lucide-react"
// import TopHeader from "./TopHeader"
// import Link from "next/link"
// import SeachBarwithDropDown from "./SeachBarwithDropDown"
// import MegaMenuBottomBar from "./MegaMenuBottomBar"
// import CartSideBar from "../CartSideBar/CartSideBar"
// import WishListSideBar from "../WishListSidebar/WishListSidebar"
// import { UserContext } from "@/context/UserContext"
// import { useRouter } from "next/navigation"
// import { getChildMenusBySlug } from "@/utils/getChildMenusBySlug"
// import { useFilter } from "@/context/FilterContext"



// export default function Header({ mainMenus, categories, notices }) {

//   const { dispatch: dispatchFilterProduct } = useFilter();
//   const { state, dispatch } = useContext(UserContext);
//   const user = state?.user;
//   const router = useRouter()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [hoveredItem, setHoveredItem] = useState(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const dropdownRef = useRef(null)
//   const [subMenuList, setSubMenuList] = useState([])


//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev)
//     setHoveredItem(null)
//   }


//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsMenuOpen(false)
//         setHoveredItem(null)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isMenuOpen])


//   // for showing nested submenu
//   useEffect(() => {

//     const subMenus = getChildMenusBySlug(mainMenus, hoveredItem?.slug);
//     setSubMenuList(subMenus)

//   }, [hoveredItem])

//   // console.log("menu list",subMenuList)


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch({ type: "LOGOUT" });
//     router.push('/')
//   };


// const handleClickParentMenuItem=(item)=>{
// if(item?.childs?.length > 0){
// setHoveredItem(hoveredItem?.slug === item?.slug ? null : item)
// }
// else{
//   handleMenuItem(item)
// }


// }

//   const handleMenuItem = (item) => {
//     dispatchFilterProduct({ type: "SET_CATEGORIES", payload: item?.id })
//     setIsMenuOpen((prev) => !prev)
//      router.push(`/shop`);
//     // router.push(`/shop/${item?.slug}`);
//   }

//   const handleHoverItem = (item) => {
//     if (item?.childs.length > 0) {
//       setHoveredItem(item)
//     }
//     else {
//       setHoveredItem(null)
//     }

//   }

//   return (
//     <div className="sticky top-0 z-50 bg-white">
//       {/* Top Header */}
//       <TopHeader notices={notices} />

//       {/* Main Header */}
//       <header className="bg-[#3A9E75] py-2 text-white  relative">
//         <div className="px-2 sm:px-4">
//           <div className="flex items-center justify-between relative">
//             {/* toggle menu */}
//             <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
//               <button onClick={toggleMenu} className="p-1">
//                 {isMenuOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
//               </button>

//             </div>
//             <div className="w-[430px] flex justify-center">
//               <Link href="/" className="text-xl sm:text-2xl font-bold">
//                 Lukaz
//               </Link>
//             </div>
//             {/* Search + Icons */}
//             <div className="w-full flex items-center justify-end gap-8   ">

//               <div className="hidden sm:flex w-full gap-2">
//                 <SeachBarwithDropDown />
//               </div>

//               {/* Icons */}
//               <div className="flex gap-1 sm:gap-0 items-center ">


//                 <WishListSideBar />
//                 <CartSideBar />

//                 {
//                   user?.name && <button
//                     onClick={handleLogout}
//                     title="Logout"
//                     className="p-1.5 sm:p-2 cursor-pointer">
//                     <LogOut className="" size={23} />
//                   </button>

//                 }
//                 {user?.name ? <Link
//                   href="/dashboard"
//                   className="p-1 sm:p-2 cursor-pointer"
//                   title="Dashboard"
//                 >
//                   <User className="" size={23} />
//                 </Link>
//                   :
//                   <Link
//                     href="/login"
//                     className="p-1 sm:p-2 cursor-pointer"
//                     title="Dashboard"
//                   >
//                     <User className="" size={23} />
//                   </Link>
//                 }



//               </div>

//             </div>
//           </div>
//         </div>


//         {/* Dropdown / MegaMenu */}
//         <div className="relative px-2 sm:px-4 mx-4">
//           <div
//             ref={dropdownRef}
//             className={`absolute top-3 z-40 mt-1 transition-all duration-500 ease-in-out 
//                   bg-white  text-black rounded shadow-lg overflow-hidden 
//                   max-h-[80vh] sm:max-h-[90vh] overflow-y-auto
//                   ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
//               } ${hoveredItem ? "w-full left-0 right-0 " : "w-full sm:w-56 left-0 sm:left-4 "}`}
//           >
//             <div className="flex flex-col  sm:flex-row">
//               {/* Sidebar Items */}
//               <ul
//                 className={`bg-gray-50 ${hoveredItem ? "min-w-[180px] sm:min-w-[200px]" : "w-full"} ${hoveredItem ? "min-h-[200px] sm:min-h-[500px]" : ""} `}
//               >
//                 {mainMenus?.map((item, i) => (
//                   <li

//                     key={i}
//                     className={`flex text-sm sm:text-[15px] justify-between px-3 sm:px-4
//                        py-3 sm:py-4 hover:bg-gray-100 hover:text-[#3A9E75] cursor-pointer whitespace-nowrap ${hoveredItem === item?.slug ? "bg-gray-100 font-semibold" : ""
//                       }`}
//                     onMouseEnter={() => handleHoverItem(item)}
//                     onClick={ ()=>handleClickParentMenuItem(item)}
//                     // onClick={() => setHoveredItem(hoveredItem?.slug === item?.slug ? null : item)}
//                   >
//                     <p
//                       // href={`/shop/${item?.slug}`}
//                       // onClick={() => handleMenuItem(item)}
//                     >
//                       {item?.name}
//                     </p>
//                     {item?.childs?.length > 0 && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}

//                   </li>
//                 ))}
//               </ul>

//               {/* MegaMenu content */}
//               {hoveredItem?.childs?.length > 0 && (
//                 <div
//                   className="flex-1  px-4 sm:px-8 lg:px-10 transition-all  lg:border-t-0  border-gray-200 pt-6  pb-4"
//                   onMouseEnter={() => setHoveredItem(hoveredItem)}
//                 >
//                   <div className="flex gap-2 sm:gap-4 items-center mb-1 sm:mb-2 hover:text-[#3A9E75] cursor-pointer">
//                     <h2 className="text-lg sm:text-2xl font-semibold">{hoveredItem?.name} Store</h2>
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
//                   </div>

//                   <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-7 lg:gap-10 pb-4">
//                     {subMenuList?.map((item, i) => (
//                       <div key={i} className="min-w-0 mt-6">
//                         <h4 
//                         // href={`/shop/${item?.slug}`}
//                         onClick={() => handleMenuItem(item)}
//                         className="font-semibold text-gray-800 cursor-pointer hover:text-[#3A9E75] text-sm sm:text-base mb-2 sm:mb-4">
//                           {item?.name} 
//                         </h4>
//                         <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-gray-600">
//                           {item?.childs.map((item, j) => (
//                             <li

//                               key={j} className="hover:text-[#3A9E75] cursor-pointer truncate">
//                               <p
//                                 href={`/shop/${item?.slug}`}
//                                 onClick={() => handleMenuItem(item)}
//                               >
//                                 {item?.name}
//                               </p>

//                             </li>
//                           ))}

//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Bottom Info Bar */}
//             {hoveredItem && (
//               <div className="sticky bottom-0 w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#E6F2ED] text-[#3A9E75] ">
              
//                 <MegaMenuBottomBar />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Bar */}
//       <div className="w-full py-2 px-4 flex sm:hidden bg-gray-50">
//         <SeachBarwithDropDown categories={categories} />
//       </div>
//     </div>
//   )
// }
