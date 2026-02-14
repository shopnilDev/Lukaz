"use client"

import Link from "next/link"
import React, { useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import toast from 'react-hot-toast';

export default function Subscription() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email address.")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      await axiosInstance.post("/subscribe", {
        email,
      })

    toast.success(` Subscription successful!`);
    setEmail("")
     
    } catch (error) {
     console.log("error on subscription", error)
      toast.error(`Something went wrong. Please try again.`);
      setMessage(error.response?.data?.message || "Failed to subscribe.")
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-10 md:mb-4 grid md:grid-cols-2 justify-around gap-6">
      <div>
        <h2 className="text-4xl font-bold">Subscribe our newsletter</h2>
        <p className="mt-2 text-gray-200">Get exclusive news and offers</p>
      </div>
      <div>
        <div className="flex items-stretch sm:items-center gap-0.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="px-4 py-2 rounded-l-md bg-white text-gray-600 placeholder-gray-400 
            flex-1 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75]
            focus:border-transparent outline-none transition-all"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-white text-gray-800 px-3 py-2 rounded-r-md hover:bg-gray-100 transition"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p className="text-sm mt-3 text-red-900">{message}</p>
        )}

        <p className="text-sm text-white mt-3">
          By signing up you consent to receive updates by email about our latest new releases
          and our best special offers. We will never share your personal information with
          third parties for their marketing purposes and you can unsubscribe at any time. For
          more information please see our{" "}
          <Link href="/privacy-policy" className="underline font-semibold">
            privacy policy
          </Link>.
        </p>
      </div>
    </div>
  )
}
