import { NextResponse } from "next/server";


const baseUrl = process.env.BASE_URL; 
const baseUrlFronEnd = process.env.BASE_URL_FRONTEND; 
const frontendUrl = baseUrlFronEnd || "http://lukazshop.com/";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();

  // console.log("query params",queryString)
  
  try {
    const response = await fetch(`${baseUrl}/api/bkash/execute?${queryString}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    const orderId=result?.merchantInvoiceNumber

    // console.log("Bkash raw response:", result);


   return NextResponse.redirect(
      `${frontendUrl}/order-success?order_id=${orderId}`,{
      status: 303, 
    }
    );


  } catch (error) {

    console.error("Bkash execute error:", error);

    return NextResponse.redirect(
      `${frontendUrl}/order-failed?error=Faild},{
      status: 303, 
    }`
    );
  }
}
