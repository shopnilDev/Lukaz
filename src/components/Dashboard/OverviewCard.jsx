import { Icon } from "@iconify/react"
import React from "react"

const gradients = [
  "bg-gradient-to-r from-[#3A9E75] to-[#56C596]", 
  "bg-gradient-to-r from-indigo-500 to-purple-500",
  "bg-gradient-to-r from-pink-500 to-rose-500", 
  "bg-gradient-to-r from-orange-400 to-yellow-500",
  "bg-gradient-to-r from-cyan-500 to-blue-500", 
]


export default function OverviewCard({ data, index,orderData }) {
  const gradient = gradients[index % gradients.length] 

  return (
    <div
      className={`p-4 rounded-sm shadow-sm text-white ${gradient}`}
    >
      <h3 className="text-lg font-semibold mb-2">{data?.title}</h3>
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{data?.value}</p>
      <Icon icon={data?.icon} width="28" height="28" />
      </div>
    </div>
  )
}
