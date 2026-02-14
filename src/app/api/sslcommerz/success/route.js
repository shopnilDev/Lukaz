
import { NextResponse } from "next/server";
const baseUrl = process.env.BASE_URL; 
const baseUrlFronEnd = process.env.BASE_URL_FRONTEND; 

export async function POST(req) {

  const frontendUrl = baseUrlFronEnd || "http://lukazshop.com/";

  try {
    const rawBody = await req.text();
    const body = Object.fromEntries(new URLSearchParams(rawBody));

      const response = await fetch(`${baseUrl}/api/sslcommerz/success`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`SSLCommerz API returned ${response.status}`);
    }

    const result = await response.json();
    
    if (!result?.tran_id) {
      throw new Error("Transaction ID not found in response");
    }


  const safeOrderId = encodeURIComponent(result?.tran_id?.replace(/,/g, "-"));

    return NextResponse.redirect(
      `${frontendUrl}/order-success?order_id=${safeOrderId}`,{
      status: 303, 
    }
    );

  } catch (err) {
    console.error("SSLCommerz success error:", err);
    
    return NextResponse.redirect(
      `${frontendUrl}/order-failed?error=${encodeURIComponent(err?.message)},{
      status: 303, 
    }`
    );
  }
}