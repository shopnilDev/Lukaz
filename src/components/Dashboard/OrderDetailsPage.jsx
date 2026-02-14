"use client"
import { useRouter } from "next/navigation"
import Container from "../shared/Container"
import { formatDate } from "@/utils/formatDate"

export default function OrderDetailsPage({orderDetails}) {
  const router = useRouter()


  return (
    <Container className="  py-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#d6eae1] pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">LUKAZBD</h1>
          <p className="text-sm text-gray-600">Lukazshop.com</p>
          <p className="text-sm text-gray-600">lukaz@gmail.com</p>
          <p className="text-sm text-gray-600">+880-17123-5678</p>
          <p className="text-sm text-gray-600">VAT: 8057071212</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">Invoice</h2>
          <p className="text-sm">Invoice Number: {orderDetails?.order_no}</p>
          <p className="text-sm">Date: {formatDate(orderDetails?.created_at)}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
        <p><span className="font-medium">Name:</span> {orderDetails?.shipping_info?.full_name}</p>
        <p><span className="font-medium">Email:</span> {orderDetails?.shipping_info?.phone}</p>
        <p><span className="font-medium">Address:</span> {orderDetails?.shipping_info?.address}</p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-[#d6eae1] rounded-md">
          <thead className="bg-[#ECF5F1] text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails?.items.map((item, index) => (
              <tr key={item.id} className="border-t border-[#d6eae1]">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.item_name}</td>
                <td className="px-4 py-2 text-center">{item?.quantity}</td>
                <td className="px-4 py-2 text-right">Tk {item?.current_price.toLocaleString()}</td>
                <td className="px-4 py-2 text-right">Tk {item?.grand_total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-64 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal:</span> <span>Tk {orderDetails?.total.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Tax:</span> <span>Tk 0</span></div>
          <div className="flex justify-between"><span>Discount:</span> <span>Tk {orderDetails?.discount}</span></div>
          <div className="flex justify-between"><span>Shipping Fee:</span> <span>Tk {orderDetails?.shipping_cost}</span></div>
          <div className="flex justify-between font-bold border-t border-[#bbcfc6] pt-2">
            <span>Total:</span> 
            <span>Tk {orderDetails?.grand_total?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Notice */}
      {/* <p className="mt-6 text-sm text-gray-600">
        Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
      </p> */}

      {/* Back button */}
      <div className="mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#3A9E75] text-white rounded-md hover:bg-[#338b65]"
        >
          Back to Orders
        </button>
      </div>
    </Container>
  )
}
