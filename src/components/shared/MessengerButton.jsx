"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const MessengerButton = () => {
  const messengerLink = "https://m.me/yourpageusername"; // Replace with your link
  const [animate, setAnimate] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
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
    <div className="fixed bottom-14 right-5 z-50 flex items-center">
      {/* Tooltip */}
      {/* {showTooltip && (
        <div className="mr-3 px-3 py-1 bg-white text-black text-sm rounded-lg shadow-lg animate-fadeIn">
          Need any Help?
        </div>
      )} */}

      {/* Messenger Button with Wave Effect */}
      <div className="relative">
        {/* Ripple/Wave Effect */}
        {animate && (
          <>
          {/* <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping-slow"></span> */}
            <span className="absolute inset-0 rounded-full bg-gray-300 opacity-30 animate-ping-slow"></span>
            <span className="absolute inset-0 rounded-full bg-gray-400 opacity-30 animate-ping-slower"></span>
          </>
        )}

        {/* Actual Button */}
        <a
          href={messengerLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="relative flex items-center justify-center w-20 h-20  bg-white  hover:bg-gray-100 text-white rounded-full shadow-lg transition"
          title="Message us on Messenger"
        >
                      <Image
                        src="/images/others/support3.png"
                        alt="visa"
                        width={60}
                        height={60}
                        className=""
                      />
          {/* <FaFacebookMessenger className="text-3xl" /> */}
        </a>
      </div>
    </div>
  );
};

export default MessengerButton;
