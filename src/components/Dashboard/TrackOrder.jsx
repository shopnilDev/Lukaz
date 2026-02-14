"use client"

import { Icon } from "@iconify/react"

export default function TrackOrder({ currentStep }) {
  const trackingSteps = [
    {
      label: "Pending",
      status: "completed",
      date: "16 Aug 2025 09:43pm",
      icon: "mdi:cart-check",
    },
    {
      label: "Confirmed",
      status: "completed",
      date: "16 Aug 2025 09:43pm",
      icon: "game-icons:confirmed",
    },
     {
      label: "Processing",
      status: "completed",
      date: "16 Aug 2025 09:43pm",
      icon: "mdi:timer-sand",
    },
      {
      label: "Packaging",
      status: "completed",
      date: "16 Aug 2025 09:43pm",
      icon: "octicon:package-dependencies-16",
    },
    {
      label: "Shipped",
      status: "completed",
      date: "Nov 21",
      icon: "material-symbols:delivery-truck-speed-rounded",
      // icon: "mdi:truck-cargo-container",
    },
   
    {
      label: "Delivered",
      status: "pending",
      date: "Nov 22",
      icon: "mdi:package-variant-closed-check",
    },
    // {
    //   label: "Canceled",
    //   status: "canceled",
    //   date: "16 Aug 2025 10:30pm",
    //   icon: "fa-solid:times",
    // },
    //  {
    //   label: "Rejected",
    //   status: "current",
    //   date: "Nov 21",
    //   icon: "jam:stop-sign",
    // },

  ]

//   const trackingSteps = [
//   { label: "Ordered", status: "completed", date: "16 Aug 2025 09:43pm", icon:"mdi:cart-check" },
//   { label: "Order Ready", status: "completed", date: "16 Aug 2025 10:30pm", icon: "mdi:close-circle-outline" },
//   { label: "Shipped", status: "pending", date: "", icon: "mdi:truck-cargo-container" },
//   { label: "Out for Delivery", status: "pending", date: "", icon: "mdi:truck-fast" },
//   { label: "Delivered", status: "pending", date: "", icon: "mdi:package-variant-closed-check" },
// ]
  return (
    <div className=" ">
      <div className="px-6 ">
        <div className="relative">
          {trackingSteps.map((step, index) => {
            const isLast = index === trackingSteps.length - 1
            const isCompleted = index + 1 < currentStep
            const isCurrent = index + 1 === currentStep

          
          const isCanceled = step.status === "canceled"

                const iconColor = isCanceled
                  ? "#DC2626" // Red for canceled
                  : isCompleted
                  ? "#3A9E75" // Green
                  : isCurrent
                  ? "#2563EB" // Blue
                  : "#9CA3AF" // Gray

            return (
              <div key={index} className="flex items-start gap-4 relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-3 top-10 w-0.5 h-16 bg-gray-300"></div>
                )}

                {/* Status Dot */}
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 mt-3 ${
                    isCompleted
                      ? "bg-[#3A9E75]"
                      : isCurrent
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                ></div>

                {/* Icon */}
                <div className="text-2xl mt-0.5 flex-shrink-0">
                  <Icon
                    icon={step.icon}
                    width="40"
                    height="40"
                    color={iconColor} 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                <h3
                  className={`font-medium text-lg mb-1 ${
                    isCanceled
                      ? "text-red-600 "
                      : isCompleted
                      ? "text-[#3A9E75]"
                      : isCurrent
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </h3>

                  <p className="text-gray-600 text-sm">{step.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
