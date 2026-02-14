"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { Lock, Phone, Loader2 } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal"

export default function LoginPage() {
  const { dispatch } = useContext(UserContext);
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!phone || !password) {
      setError("Please enter both phone no and password.")
      return
    }

    try {
      setLoading(true);
      const payloadData = {
        mobile: phone,
        password: password,
      }
      const res = await axiosInstance.post("/login", payloadData);
      const { token, data } = res.data;

      const user = {
        name: data?.name,
        email: data?.email || "No Email Added",
        phone: data?.mobile,
      };

      dispatch({ type: "LOGIN", payload: { user, token: token } });
      // console.log("loggedin user:", user)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // setLoading(false);
      router.push("/dashboard")
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }


  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className=" bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden md:grid md:grid-cols-2 border border-gray-200">
        {/* Left Column */}
        <div className="hidden md:flex items-center justify-center p-8 bg-[#3A9E75] relative text-white text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg opacity-90 max-w-xs mx-auto">
              Log in to continue your shopping journey and explore amazing products.
            </p>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center ">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="+88010000000"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                />
              </div>
            </div>
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

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div className="flex flex-col sm:flex-row md:items-center justify-between text-sm gap-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#3A9E75] focus:ring-[#3A9E75] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="font-medium text-[#3A9E75] hover:text-[#318b66]"

                onClick={(e) => {
                  e.preventDefault();
                  setShowForgotModal(true);
                }}
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#3A9E75] hover:bg-[#318b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A9E75] transition-colors duration-200 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-[#3A9E75] hover:text-[#318b66]">
                Sign up
              </Link>
            </p>
          </div>

          {/* <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div> */}

          {/* <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Google className="h-5 w-5 mr-2" />
                Google
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </div>
          </div> */}
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

    </div>
  )
}
