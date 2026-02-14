"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import TrackOrder from "./TrackOrder"
import axiosInstance from "@/utils/axiosInstance"

export default function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("")
  const [phone, setPhone] = useState("")
 const [currentStep,setCurrentStep]=useState(0)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const payloadData={
      order_no:orderNumber,
      phone
    }

    try {
      const {data} = await axiosInstance.post("/order/traces", payloadData);

    // console.log("trace order res",data)
    setCurrentStep(data[0]?.status_id)
    } catch (error) {
      
    }

   
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white  w-full ">
        <h1 className="text-2xl font-bold  text-gray-800 mb-3">
          Track Your Order
        </h1>
       <div className=" flex flex-col sm:flex-row gap-4">
         <div className="w-full sm:w-2/4">
          <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
               className="mt-1 block w-full bg-white px-3 py-1.5 sm:py-2 border
                   border-gray-300 rounded-sm shadow-sm placeholder-gray-400
                    focus:outline-none
                   focus:ring-1 focus:ring-[#3A9E75] focus:border-[#3A9E75]
                    sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone 
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
               className="mt-1 block w-full bg-white px-3 py-1.5 sm:py-2 border
                   border-gray-300 rounded-sm shadow-sm placeholder-gray-400
                    focus:outline-none
                   focus:ring-1 focus:ring-[#3A9E75] focus:border-[#3A9E75]
                    sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 bg-[#3A9E75] text-white rounded-sm font-semibold hover:bg-[#338b65]"
          >
            TRACK
          </button>
        </form>
        </div>
        <div className="w-full sm:w-2/4">
  <TrackOrder currentStep={currentStep}/>
        </div>
       </div>
       
      </div>
    </div>
  )
}
