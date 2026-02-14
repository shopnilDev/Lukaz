import { formatDate } from '@/utils/formatDate'
import React from 'react'

export default function OrderListCard({orderList}) {
  return (
     <div>
         <div className="space-y-4">
          {orderList?.map((order,i) => (
            <div
              key={i}
              className={`${i!=0 && " border-t border-t-gray-400 pt-6"}`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 border-gray-100 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order No {order?.order_no}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {formatDate(order?.created_at)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {/* <span
                    className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                  Payment Status  {order?.status}
                  </span> */}
                  <div className='flex items-center '>
                     <span className='text-sm '>Payment Status:</span> 
                   <span
                    className={`px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto ${
                      order.payment_status === "Due"
                        ? "text-yellow-800"
                        : "text-green-800"
                    }`}
                  >
                 {order?.payment_status}
                  </span>
                  </div>

                  {/* View Details - top right on larger screens */}
                  <button className="hidden text-sm sm:inline-block px-3 py-1.5 bg-[#3A9E75] text-white rounded-md hover:bg-[#338b65] shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A9E75]">
                    View Details
                  </button>
                </div>
              </div>

              {/* Items */}
              {/* <div className="mb-4 mt-3">
                <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                <ul className="space-y-2 text-gray-600">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-b-0 last:pb-0"
                    >
                      <span>
                        {item.qty} x {item.name}
                      </span>
                      <span>£{(item.qty * item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Total */}
              {/* <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">Total:</p>
                <p className="text-lg font-bold text-gray-900">
                  Tk{order.total.toFixed(2)}
                </p>
              </div> */}

              {/* View Details - full width on small screens */}
              <div className="mt-4 sm:hidden">
                <button className="w-full px-4 py-2 bg-[#3A9E75] text-white rounded-md hover:bg-[#338b65] shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A9E75]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
     </div>
  )
}
