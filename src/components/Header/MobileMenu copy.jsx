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
      <ul className="">
        {mainMenus?.map((item, i) => (
          <li key={i} className="p-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                item?.childs?.length > 0
                  ? toggleExpand(item.slug)
                  : handleNavigate(item)
              }
            >
              <span className="text-sm font-medium">{item.name}</span>
              {item?.childs?.length > 0 && (
                <ChevronRight
                  size={18}
                  className={`transition ${
                    expanded[item.slug] ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>

            {/* Children */}
            {expanded[item.slug] && item?.childs?.length > 0 && (
              <ul className="mt-2 ml-3 space-y-2">
                {item.childs.map((child, j) => (
                  <li key={j}>
                    <div
                      className="flex justify-between items-center cursor-pointer text-sm text-gray-700"
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
                          className={`transition ${
                            nestedExpanded[child.slug] ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Nested Children */}
                    {nestedExpanded[child.slug] &&
                      child?.childs?.length > 0 && (
                        <ul className="mt-1 ml-3 space-y-1 text-xs text-gray-600">
                          {child.childs.map((nested, k) => (
                            <li
                              key={k}
                              className="cursor-pointer hover:text-[#3A9E75]"
                              onClick={() => handleNavigate(nested)}
                            >
                              {nested.name}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}