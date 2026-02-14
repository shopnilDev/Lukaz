'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';


export default function TopHeader({notices}) {
  const [index, setIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [closing, setClosing] = useState(false);

  // Auto rotate notices
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % notices.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll down to close
  useEffect(() => {
    const handleScroll = () => {
      if (!openDrawer) return;

      const direction = window.scrollY;
      if (direction > 50) {
        triggerClose();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openDrawer]);

  const triggerClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpenDrawer(false);
      setClosing(false);
    }, 300); // match animation duration
  };

  const current = notices[index];

// console.log("notices", notices)

  return (
    <>
      {/* Top Header */}
      <div className="bg-white text-sm border-b border-gray-200 relative z-20">
        <div className="px-4 flex justify-center items-center h-8 max-w-screen-xl mx-auto">
          <p className="text-center">{current?.title}</p>
          <button
            onClick={() => setOpenDrawer(true)}
            className="ml-2 p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      {openDrawer && (
        <div
          className={`fixed top-0 left-0 right-0 bg-white shadow-md border-b z-50
            ${closing ? 'animate-slide-up' : 'animate-slide-down'}`}
        >
          <div className="max-w-screen-xl mx-auto px-4 py-4 relative">
            <button
              onClick={triggerClose}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded"
            >
              <X size={24} />
            </button>

            <div className="px-0 sm:px-10 md:px-16 py-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-16 mt-6">
              {notices.map((notice, i) => (
                <div key={i}>
                  <p className="font-medium mb-1 sm:mb-6">{notice?.title}</p>
                  <p className="text-gray-600 text-sm ">{notice?.description}</p>
                 <Link
                 href={notice?.href}
                 className='mt-6 flex gap-1 items-center hover:text-[#3A9E75] cursor-pointer'> 
                  <p >{notice?.button_text} </p>
                  <ChevronRight size={16} /></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-in forwards;
        }
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
