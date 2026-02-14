"use client";

import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-14 text-center bg-white shadow-sm">
        <div className="max-w-3xl mx-auto">
          <FileText className="mx-auto mb-6 text-[#3A9E75]" size={60} />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Terms & Conditions</h1>
          <p className="mt-4 text-lg text-gray-600">Last updated: January 1, 2025</p>
          <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            By accessing or using our website, you agree to comply with these Terms &
            Conditions. Please read them carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing this site, you confirm that you are at least 18 years old
            or accessing under the supervision of a parent or legal guardian.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Website</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use this website only for lawful purposes and in a manner
            that does not infringe the rights of others, restrict, or inhibit their use.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
            <li>No fraudulent, abusive, or unlawful activity is permitted.</li>
            <li>Content must not violate intellectual property rights.</li>
            <li>Attempts to disrupt or hack our systems are strictly prohibited.</li>
          </ul>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Product Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We strive for accuracy in product descriptions, pricing, and availability.
            However, we do not guarantee that all information is free from error.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Orders & Payments</h2>
          <p className="text-gray-600 leading-relaxed">
            All orders placed are subject to acceptance and product availability.
            Payment must be made in full before shipping.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            We shall not be held liable for indirect, incidental, or consequential
            damages arising from the use of our services or products.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content, trademarks, logos, and materials on this site are the
            intellectual property of our company and protected under copyright law.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to update or modify these Terms & Conditions at any
            time. Changes will be effective immediately once posted on this page.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions or clarifications regarding these Terms, please contact:
          </p>
          <div className="mt-4 text-gray-700 font-medium">
            📧 support@example.com <br />
            📍 123 Green Street, Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </div>
  );
}
