"use client"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"
import { useState } from "react"



export default function OrdersTable({title,orderList}) {
//  console.log("order list",orderList)

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"
      case "Shipped":
        return "bg-blue-100 text-blue-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return ""
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto text-gray-900 ">
        <table className="w-full border border-gray-50  overflow-hidden">
          <thead className="bg-[#ECF5F1] text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Order No</th>
              {/* <th className="px-4 py-3 text-left">Total Item</th> */}
              
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Payment Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 text-gray-800">
                <td className="px-4 py-3">{order?.order_no}</td>
                {/* <td className="px-4 py-3">-</td> */}
                <td className="px-4 py-3 text-center">{order?.quantity}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">৳ {order?.grand_total}</td>
                <td className="px-4 py-3">{formatDate(order?.created_at)}</td>
                <td className="px-4 py-3 text-center space-x-2 ">
                  <Link
                  href={`/dashboard/order/${order?.order_no}`}
                  className="text-blue-600 hover:underline">View</Link>
                  <button className="text-red-600 hover:underline">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
