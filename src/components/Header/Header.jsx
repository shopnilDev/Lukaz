"use client"

import { useContext, useEffect, useRef, useState } from "react"
import {
  User,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react"

import TopHeader from "./TopHeader"
import Link from "next/link"
import SeachBarwithDropDown from "./SeachBarwithDropDown"
import MegaMenuBottomBar from "./MegaMenuBottomBar"
import CartSideBar from "../CartSideBar/CartSideBar"
import WishListSideBar from "../WishListSidebar/WishListSidebar"

import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { getChildMenusBySlug } from "@/utils/getChildMenusBySlug"
import { useFilter } from "@/context/FilterContext"

export default function Header({ mainMenus, categories, notices }) {
  const { dispatch: dispatchFilterProduct } = useFilter()
  const { state, dispatch } = useContext(UserContext)
  const user = state?.user

  const router = useRouter()
  const dropdownRef = useRef(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [subMenuList, setSubMenuList] = useState([])
  const [hoveredSubItem, setHoveredSubItem] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
    setHoveredItem(null)
    setHoveredSubItem(null)
  }

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMenuOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
        setHoveredItem(null)
        setHoveredSubItem(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Load submenu items
  useEffect(() => {
    const subMenus = getChildMenusBySlug(mainMenus, hoveredItem?.slug)
    setSubMenuList(subMenus || [])
    setHoveredSubItem(null)
  }, [hoveredItem, mainMenus])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
    router.push("/")
  }

  const handleClickParentMenuItem = item => {
    if (item?.childs?.length > 0) {
      setHoveredItem(prev =>
        prev?.slug === item.slug ? null : item
      )
    } else {
      handleMenuItem(item)
    }
  }

  const handleMenuItem = item => {
    dispatchFilterProduct({
      type: "SET_CATEGORIES",
      payload: item?.id,
    })

    setIsMenuOpen(false)
    setHoveredItem(null)
    setHoveredSubItem(null)

    router.push("/shop")
  }

  const handleHoverItem = item => {
    if (item?.childs?.length > 0) {
      setHoveredItem(item)
    } else {
      setHoveredItem(null)
    }
  }

  const activeSubmenu = subMenuList?.find(
    item => item.slug === hoveredSubItem
  )

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Top Header */}
      <TopHeader notices={notices} />

      {/* Main Header */}
      <header className="bg-[#3A9E75] py-2 text-white relative">
        <div className="px-2 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Menu Toggle */}
            <button onClick={toggleMenu} className="p-1">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <div className="w-[430px] flex justify-center">
              <Link href="/" className="text-xl sm:text-2xl font-bold">
                Lukaz
              </Link>
            </div>

            {/* Search + Icons */}
            <div className="w-full flex justify-end items-center gap-6">
              <div className="hidden sm:flex w-full">
                <SeachBarwithDropDown />
              </div>

              <WishListSideBar />
              <CartSideBar />

              {user?.name && (
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2"
                >
                  <LogOut size={22} />
                </button>
              )}

              <Link
                href={user?.name ? "/dashboard" : "/login"}
                className="p-2"
              >
                <User size={22} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <div className="relative px-2 sm:px-4 mx-4">
          <div
            ref={dropdownRef}
            className={`absolute top-3 z-40 mt-1 transition-all duration-500
              bg-white text-black rounded shadow-lg overflow-hidden
              max-h-[85vh] overflow-y-auto
              ${isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-3 pointer-events-none"
              }
              ${hoveredItem ? "w-full left-0" : "w-56 left-0"}
            `}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Sidebar */}
              <ul className="bg-gray-50 min-w-[220px]">
                {mainMenus?.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between px-4 py-3 text-sm
                               hover:bg-gray-100 hover:text-[#3A9E75]
                               cursor-pointer"
                    onMouseEnter={() => handleHoverItem(item)}
                    onClick={() => handleClickParentMenuItem(item)}
                  >
                    {item?.name}
                    {item?.childs?.length > 0 && (
                      <ChevronRight size={18} />
                    )}
                  </li>
                ))}
              </ul>

              {/* Content */}
              {hoveredItem?.childs?.length > 0 && (
                <div
                  className="flex-1 px-6 lg:px-10 pt-6 pb-4"
                  onMouseLeave={() => setHoveredSubItem(null)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-xl font-semibold">
                      {hoveredItem?.name} Store
                    </h2>
                    <ChevronRight size={18} />
                  </div>

                  {/* Submenu Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4">
                    {subMenuList?.map((item, i) => (
                      <div key={i} className="min-w-0">
                        <h4
                          onMouseEnter={() =>
                            setHoveredSubItem(item?.slug)
                          }
                          onClick={() => handleMenuItem(item)}
                          className="font-semibold text-gray-800
                                     hover:text-[#3A9E75]
                                     cursor-pointer text-sm flex items-center gap-1"
                        >
                          {item?.name}
                          <ChevronRight size={16} />
                        </h4>

                        {/* Mobile Children */}
                        <ul className="block lg:hidden mt-1 space-y-1 text-xs text-gray-600">
                          {item?.childs?.map((child, j) => (
                            <li
                              key={j}
                              className="hover:text-[#3A9E75] cursor-pointer truncate"
                              onClick={() => handleMenuItem(child)}
                            >
                              {child?.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Full Width Children */}
                  {activeSubmenu?.childs?.length > 0 && (
                    <div className="hidden lg:block border-t pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <ul className="grid grid-cols-3 xl:grid-cols-4 gap-6 text-sm text-gray-600">
                        {activeSubmenu.childs.map((child, j) => (
                          <li
                            key={j}
                            className="hover:text-[#3A9E75] cursor-pointer truncate"
                            onClick={() => handleMenuItem(child)}
                          >
                            {child?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            {hoveredItem && (
              <div className="sticky bottom-0 w-full px-6 py-4 bg-[#E6F2ED] text-[#3A9E75]">
                <MegaMenuBottomBar />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="w-full py-2 px-4 flex sm:hidden bg-gray-50">
        <SeachBarwithDropDown categories={categories} />
      </div>
    </div>
  )
}
