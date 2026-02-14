"use client";

import Container from "@/components/shared/Container";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("order_id");
    setOrderId(id);
  }, [searchParams]);

  return (
    <Container className="px-6 py-14">
      <div className=" text-center">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p>Your order has been successfully placed.</p>
      {orderId ? <p>Order ID: {orderId}</p> : <p>Loading...</p>}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
        href={`/dashboard`}
        className="bg-[#3A9E75] px-3 py-1.5 rounded-md text-white text-sm"
        >
        Go To Dashboard
        </Link>
         <Link
        href={`/shop`}
        className="bg-[#FF5B2E] px-3 py-1.5 rounded-md text-white text-sm"
        >
        Continue Shoping
        </Link>
      </div>
      </div>
    </Container>
  );
}
