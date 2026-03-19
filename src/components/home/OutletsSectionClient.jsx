"use client";

import Image from "next/image";
import React, { useState } from "react";
import { getImageUrl } from "@/utils/helpers";

// Hardcoded outlet details with addresses, phone numbers, and map data
// const outletDetails = {
//   rajshahi: {
//     nameEn: "Rajshahi Outlet",
//     nameBn: "রাজশাহী আউটলেট",
//     addressEn:
//       "Kadirganj, Chal Potti, Beside Laz Pharma, Rajshahi.",
//     addressBn:
//       "কাদিরগঞ্জ, চাল পট্টি, লাজ ফার্মার পাশে, রাজশাহী।",
//     manager: "01798091972",
//     mapQuery: "Kadirganj+Chalpotti+Rajshahi+Bangladesh",
//     mapLink:
//       "https://maps.app.goo.gl/3WmrsRVco7pczPw77?g_st=aw",
//   },
//   dhaka: {
//     nameEn: "Dhaka Outlet",
//     nameBn: "ঢাকা আউটলেট",
//     addressEn:
//       "Uttara Azampur Sector-3 (Main Road Adjacent), London Plaza, 3rd Floor. (After passing Uttara Airport, going to House Building, on Azampur Main Road, opposite Shahjalal Islami Bank, you will see the Lukaz signboard)",
//     addressBn:
//       "উত্তরা আজমপুর সেক্টর-৩ (মেইন রোড সংলগ্ন) লন্ডন প্লাজা, তৃতীয় তলা। (উত্তরা এয়ারপোর্ট পার হয়ে, হাউজ বিল্ডিং যেতে, আজমপুর মেইন রোডে, শাহজালাল ইসলামী ব্যাংক এর বিপরীত পাশে Lukaz-লুকাজ এর সাইনবোর্ড দেখতে পাবেন)",
//     manager: "01794034665",
//     mapQuery: "Azampur+Sector+3+London+Plaza+Uttara+Dhaka+Bangladesh",
//     mapLink:
//       "https://maps.app.goo.gl/t7UfLom9xgwN168g7?g_st=aw",
//   },
//   sylhet: {
//     nameEn: "Sylhet Outlet",
//     nameBn: "সিলেট আউটলেট",
//     addressEn:
//       "Haat Super Mall, 2nd Floor, Uposhor, Sylhet.",
//     addressBn:
//       "হাট সুপার মল, দ্বিতীয় তলা, উপশহর, সিলেট।",
//     manager: "01797273380",
//     mapQuery: "Haat+Super+Mall+Uposhor+Sylhet+Bangladesh",
//     mapLink:
//       "https://maps.app.goo.gl/1AuBeBVAJUNs9ctU9?g_st=aw",
//   },
// };

const outletDetails = {
  rajshahi: {
    nameEn: "Rajshahi Outlet",
    nameBn: "রাজশাহী আউটলেট",
    addressEn: "Kadirganj, Chal Potti, Beside Laz Pharma, Rajshahi.",
    addressBn: "কাদিরগঞ্জ, চাল পট্টি, লাজ ফার্মার পাশে, রাজশাহী।",
    manager: "01798091972",

    mapEmbed: "https://www.google.com/maps?q=LUKAZ+Kadirganj+Rajshahi+Bangladesh&output=embed",


    mapLink:
      "https://maps.app.goo.gl/3WmrsRVco7pczPw77?g_st=aw",
  },

  dhaka: {
    nameEn: "Dhaka Outlet",
    nameBn: "ঢাকা আউটলেট",
    addressEn:
      "Uttara Azampur Sector-3 (Main Road Adjacent), London Plaza, 3rd Floor.",
    addressBn:
      "উত্তরা আজমপুর সেক্টর-৩ (মেইন রোড সংলগ্ন) লন্ডন প্লাজা, তৃতীয় তলা।",
    manager: "01794034665",

    mapEmbed:
      "https://www.google.com/maps?q=LUKAZ+London+Plaza+Azampur+Sector+3+Uttara+Dhaka+Bangladesh&output=embed",

    mapLink:
      "https://maps.app.goo.gl/t7UfLom9xgwN168g7?g_st=aw",
  },

  sylhet: {
    nameEn: "Sylhet Outlet",
    nameBn: "সিলেট আউটলেট",
    addressEn: "Haat Super Mall, 2nd Floor, Uposhor, Sylhet.",
    addressBn: "হাট সুপার মল, দ্বিতীয় তলা, উপশহর, সিলেট।",
    manager: "01797273380",

    mapEmbed:
      "https://www.google.com/maps?q=LUKAZ+Super+Mall+Uposhor+Sylhet+Bangladesh&output=embed",

    mapLink:
      "https://maps.app.goo.gl/1AuBeBVAJUNs9ctU9?g_st=aw",
  },
};

// Helper to match outlet from API to our hardcoded details
function getOutletDetails(outletName) {
  const name = (outletName || "").toLowerCase();
  if (name.includes("রাজশাহী") || name.includes("rajshahi")) return outletDetails.rajshahi;
  if (name.includes("ঢাকা") || name.includes("dhaka")) return outletDetails.dhaka;
  if (name.includes("সিলেট") || name.includes("sylhet")) return outletDetails.sylhet;
  return null;
}

// ──── Map Modal ────
function MapModal({ isOpen, onClose, details }) {
  if (!isOpen || !details) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#3A9E75]">
          <div>
            <h3 className="text-white font-bold text-lg">{details.nameBn}</h3>
            <p className="text-white text-sm">{details.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Map iframe */}
        <div className="w-full h-[300px] sm:h-[350px]">
          <iframe
            src={details?.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${details.nameEn} Map`}
          />
        </div>

        {/* Footer with link to open full Google Maps */}
        <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">📍 {details.addressBn}</p>
          <a
            href={details.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline whitespace-nowrap ml-3"
          >
            Open in Maps →
          </a>
        </div>
      </div>
    </div>
  );
}

// ──── Location Details Popup ────
function LocationPopup({ isOpen, onClose, details }) {
  if (!isOpen || !details) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#3A9E75] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div>
                <h3 className="font-bold text-lg">{details.nameBn}</h3>
                <p className="text-white text-sm">{details.nameEn}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Bengali Address */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              বাংলায় ঠিকানা
            </p>
            <p className="text-gray-800 leading-relaxed">{details.addressBn}</p>
          </div>

          {/* English Address */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Address in English
            </p>
            <p className="text-gray-800 leading-relaxed">{details.addressEn}</p>
          </div>

          {/* Manager Contact */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
              ম্যানেজার / Manager
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Phone Call */}
              <a
                href={`tel:${details.manager}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {details.manager}
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/88${details.manager}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──── Single Outlet Card ────
function OutletCard({ outlet }) {
  const [showMap, setShowMap] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const details = getOutletDetails(outlet?.name);

  return (
    <>
      <div className="group w-[43%] lg:w-[30%] xl:w-[28%]">
        {/* Image — Click to show map */}
        <div
          className="relative w-full h-40 sm:h-52 md:h-72 rounded-md overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          onClick={() => details && setShowMap(true)}
        >
          <Image
            src={
              getImageUrl("branch", outlet?.image) || "/placeholder.svg"
            }
            alt={outlet?.name || "Outlet"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay on hover */}
          {details && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View Live Location
              </div>
            </div>
          )}
        </div>

       <div className="flex justify-center">
         <p
          onClick={() => details && setShowMap(true)}
          className="flex gap-2 text-center items-center py-0.5 cursor-pointer text-sm md:text-base hover:text-[#3A9E75] font-semibold hover:font-bold"
        >
          
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            /> 
          </svg>
          Google Map
        </p>
       </div>
        {/* Name — Click to show location details */}
        <h3
          className={`mt-3 text-base sm:text-lg font-semibold text-gray-800 text-center ${details
            ? "cursor-pointer hover:text-blue-600 transition-colors duration-200"
            : ""
            }`}
          onClick={() => details && setShowLocation(true)}
        >
          {outlet?.name}
          {/* {details && (
            <span className="inline-block ml-1 text-blue-500 text-xs align-middle">
              ▸ বিস্তারিত
            </span>
          )} */}
        </h3>

        {/* Phone & WhatsApp below card */}
        {/* {details && (
          <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
            <a
              href={`tel:${details.manager}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm text-gray-700 font-medium transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </a>
            <a
              href={`https://wa.me/88${details.manager}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 rounded-full text-xs sm:text-sm text-green-700 font-medium transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        )} */}
      </div>

      {/* Modals */}
      <MapModal isOpen={showMap} onClose={() => setShowMap(false)} details={details} />
      <LocationPopup isOpen={showLocation} onClose={() => setShowLocation(false)} details={details} />
    </>
  );
}

// ──── Main Client Component ────
export default function OutletsSectionClient({ outlets }) {
  return (
    <>
      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.25s ease-out;
        }
      `}</style>

      <section className="bg-[#f8fcff] pt-12 pb-4 md:pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Title */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center gap-4">
              <span className="block h-[2px] w-12 bg-gray-400"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-center space-grotesk">
                Our All Outlets
              </h2>
              <span className="block h-[2px] w-12 bg-gray-400"></span>
            </div>
          </div>

          {/* Outlets Grid */}
          <div className="flex flex-wrap gap-4 sm:gap-4 md:gap-6 justify-center">
            {outlets?.map((outlet, index) => (
              <OutletCard key={index} outlet={outlet} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


function getEmbedMapUrl(mapLink) {
  if (!mapLink) return "";

  // if it's a google short link, just return it
  if (mapLink.includes("maps.app.goo.gl")) {
    return mapLink;
  }

  const encoded = encodeURIComponent(mapLink);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
}