"use client";

import React, { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const MessengerButton = () => {
  const messengerLink = "https://m.me/yourpageusername"; // Replace with your link
  const [animate, setAnimate] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if the user already clicked
    const clickedBefore = localStorage.getItem("messengerClicked");
    if (!clickedBefore) {
      setAnimate(true);
      setShowTooltip(true);
    }
  }, []);

  const handleClick = () => {
    setAnimate(false);
    setShowTooltip(false);
    localStorage.setItem("messengerClicked", "true");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      {/* Tooltip */}
      {showTooltip && (
        <div className="mr-3 px-3 py-1 bg-white text-black text-sm rounded-lg shadow-lg animate-fadeIn">
          Need any Help?
        </div>
      )}

      {/* Button */}
      <a
        href={messengerLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition
          ${animate ? "animate-bounce" : ""}`}
        title="Message us on Messenger"
      >
        <FaFacebookMessenger className="text-2xl" />
      </a>
    </div>
  );
};

export default MessengerButton;
