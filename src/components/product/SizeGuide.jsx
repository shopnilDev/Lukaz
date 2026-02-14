'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const sizes = [
  { us: 8, uk: 7, cm: 26 },
  { us: 9, uk: 8, cm: 27 },
  { us: 10, uk: 9, cm: 28 },
  { us: 11, uk: 10, cm: 29 },
  { us: 12, uk: 11, cm: 30 },
  { us: 13, uk: 12, cm: 31 },
  { us: 14, uk: 13, cm: 32 },
  { us: 18, uk: 17, cm: 40 },
];

const SizeModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-md max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Size Guide</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Table with different column backgrounds */}
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="min-w-full text-center text-sm text-gray-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-4 font-semibold rounded-tl-md bg-[#a5e8cc]">
                        US
                      </th>
                      <th className="px-4 py-4 font-semibold bg-[#ffd580]">
                        UK
                      </th>
                      <th className="px-4 py-4 font-semibold rounded-tr-md bg-[#ffb3ba]">
                        CM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, idx) => (
                      <tr key={idx}>
                        {/* US Column */}
                        <td
                          className={`py-3 ${
                            idx % 2 === 0 ? 'bg-[#e9f7f0]' : 'bg-[#d4f1e5]'
                          }`}
                        >
                          {size.us}
                        </td>

                        {/* UK Column */}
                        <td
                          className={`py-3 ${
                            idx % 2 === 0 ? 'bg-[#fff4d6]' : 'bg-[#ffe9b3]'
                          }`}
                        >
                          {size.uk}
                        </td>

                        {/* CM Column */}
                        <td
                          className={`py-3 ${
                            idx % 2 === 0 ? 'bg-[#ffe5e8]' : 'bg-[#ffcdd2]'
                          }`}
                        >
                          {size.cm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeModal;
