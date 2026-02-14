"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1 = request, 2 = reset
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

 

        try {
          const res = await axiosInstance.post("/forget_password", { email: phone });
          console.log(" otp res-",res)
          setMessage(res.data?.status || "OTP sent to your mobile.");
          setStep(2);
        } catch (err) {
          setMessage(err?.response?.data?.message || "Failed to send OTP.");
        } finally {
          setLoading(false);
        }


    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axiosInstance.post("/reset-password", {
                mobile: phone,
                otp,
                newPassword,
            });
            setMessage(res.data?.message || "Password reset successfully!");
            setStep(3); // success
        } catch (err) {
            setMessage(err?.response?.data?.message || "Reset failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative mx-2">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                {step === 1 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Forgot Your Password ?</h2>
                        <form onSubmit={handleRequestReset} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Enter Your Phone Number</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+8801XXXXXXXXX"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 rounded-md bg-[#3A9E75] text-white font-medium hover:bg-[#318b66] flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send OTP"}
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Reset Password</h2>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">OTP Code</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    required
                                    className="w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm "
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 rounded-md bg-[#3A9E75] text-white font-medium hover:bg-[#318b66] flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Reset Password"}
                            </button>
                        </form>
                    </>
                )}

                {message && (
                    <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
}
