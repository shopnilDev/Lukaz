"use client";

import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-14 text-center bg-white shadow-sm">
        <div className="max-w-3xl mx-auto">
          <ShieldCheck className="mx-auto mb-6 text-[#3A9E75]" size={60} />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: January 1, 2025
          </p>
          <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We respect your privacy and are committed to protecting your personal data.
            This policy explains how we handle your information when you use our website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect information that you provide directly to us when you register, subscribe,
            or interact with our services. This includes:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
            <li>Personal details like name, email, and phone number.</li>
            <li>Payment details when making purchases.</li>
            <li>Technical data such as device type, browser, and IP address.</li>
          </ul>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Provide, operate, and improve our services.</li>
            <li>Process secure transactions.</li>
            <li>Send service-related updates and promotions.</li>
            <li>Ensure website security and prevent fraud.</li>
          </ul>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience,
            remember preferences, and analyze site traffic. You can disable cookies
            through your browser settings, but some features may not function properly.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            We may share your information with trusted third-party providers who help us
            run our business. These partners are required to keep your data secure and
            only use it for authorized purposes.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your data.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please reach out to us:
          </p>
          <div className="mt-4 text-gray-700 font-medium">
            📧 privacy@example.com <br />
            📍 123 Green Street, Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </div>
  );
}
