"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFilter } from "@/context/FilterContext"

export default function MobileMenu({ mainMenus, onClose }) {
  const router = useRouter()
  const { dispatch: dispatchFilterProduct } = useFilter()

  const [expanded, setExpanded] = useState({})
  const [nestedExpanded, setNestedExpanded] = useState({})

  const toggleExpand = slug => {
    setExpanded(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const toggleNestedExpand = slug => {
    setNestedExpanded(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const handleNavigate = item => {
    dispatchFilterProduct({
      type: "SET_CATEGORIES",
      payload: item?.id,
    })

    onClose()
    router.push("/shop")
  }

  return (
    <div className="bg-white text-black w-full max-h-[80vh] overflow-y-auto">
      <ul className="p-2 space-y-1">
        {mainMenus?.map((item, i) => (
          <li
            key={i}
            className="bg-gray-50 rounded-xs shadow-sm  overflow-hidden"
          >
            {/* Parent */}
            <div
              className="flex justify-between items-center px-4 py-3
                         cursor-pointer active:scale-[0.98]
                         transition"
              onClick={() =>
                item?.childs?.length > 0
                  ? toggleExpand(item.slug)
                  : handleNavigate(item)
              }
            >
              <span className="text-sm font-semibold tracking-wide">
                {item.name}
              </span>

              {item?.childs?.length > 0 && (
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 text-gray-500
                    ${expanded[item.slug] ? "rotate-90 text-[#3A9E75]" : ""}
                  `}
                />
              )}
            </div>

            {/* Children */}
            <div
              className={`grid transition-all duration-300 ease-in-out
                ${expanded[item.slug]
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                {item?.childs?.length > 0 && (
                  <ul className="px-4 pb-3 space-y-1">
                    {item.childs.map((child, j) => (
                      <li key={j}>
                        {/* Child */}
                        <div
                          className="flex justify-between items-center
                                     py-2 px-2 rounded-lg
                                     cursor-pointer text-sm
                                     text-gray-700 hover:bg-white
                                     active:bg-gray-100 transition"
                          onClick={() =>
                            child?.childs?.length > 0
                              ? toggleNestedExpand(child.slug)
                              : handleNavigate(child)
                          }
                        >
                          <span>{child.name}</span>

                          {child?.childs?.length > 0 && (
                            <ChevronRight
                              size={16}
                              className={`transition-transform duration-300 text-gray-400
                                ${nestedExpanded[child.slug]
                                  ? "rotate-90 text-[#3A9E75]"
                                  : ""
                                }`}
                            />
                          )}
                        </div>

                        {/* Nested */}
                        <div
                          className={`grid transition-all duration-300
                            ${nestedExpanded[child.slug]
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                          <div className="overflow-hidden">
                            {child?.childs?.length > 0 && (
                              <ul className="ml-3 mt-1 space-y-1">
                                {child.childs.map((nested, k) => (
                                  <li
                                    key={k}
                                    className="text-xs text-gray-500
                                               py-1 px-2 rounded-md
                                               cursor-pointer hover:text-[#3A9E75]
                                               hover:bg-white transition"
                                    onClick={() => handleNavigate(nested)}
                                  >
                                    {nested.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}