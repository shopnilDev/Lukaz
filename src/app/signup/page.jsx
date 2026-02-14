"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { User, Lock, ChromeIcon as Google, Github, Phone,Loader2 } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const {  dispatch } = useContext(UserContext);
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name || !phone || !password || !confirmPassword) {
      setError("All fields are required.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }
    if (!agreed) {
      setError("You must agree to the terms and conditions.")
      return
    }

    
   
  try {
      setLoading(true);
      const payloadData={
        name,
        mobile: phone,
        password,
        confirm_password:confirmPassword
      }
     
      const res = await axiosInstance.post("/register", payloadData);
      const { token, data ,status} = res.data;
     
      const user = {
        name: data?.name,
        email: data?.email || "No Email Added",
        phone: data?.mobile,
      };

      dispatch({ type: "LOGIN", payload: { user, token: token } });
      console.log("registerd user after dispatch:", user)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      router.push("/dashboard")
    } catch (err) {
      const message =
      err?.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }




  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4 sm:px-6 py-8 sm:py-14">
      <div className="min-h-screenbg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden md:grid md:grid-cols-2 border border-gray-200">
        {/* Left Column: Signup Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                />
              </div>
            </div>

            {/* phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone No
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801000000"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2 text-sm">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-[#3A9E75] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{" "}
                <a href="/terms" className="text-[#3A9E75] hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            {/* Submit */}
       
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#3A9E75] hover:bg-[#318b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A9E75] transition-colors duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[#3A9E75] hover:text-[#318b66]">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden md:flex items-center justify-center p-8 bg-[#3A9E75] relative text-white text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Our Community!</h2>
            <p className="text-lg opacity-90 max-w-xs mx-auto">
              Sign up to unlock exclusive deals, track your orders, and much more.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
