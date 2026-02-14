"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { getImageUrl } from "@/utils/helpers";

export default function TopBannerSlider({ banners }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-[18vh] xs:h-[34vh] sm:h-[38vh] md:h-[40vh] lg:h-[65vh] relative"
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  // backgroundImage: `url("/images/banner/b1.png")`,
                  backgroundImage: `url(${getImageUrl("banners", banner?.image)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Centered Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-12 z-10">
                <div className="max-w-2xl">
                  {/* Title */}
                  <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg space-grotesk">
                    {banner?.title}
                  </h1>

                  {/* Description */}
                  {banner?.description && (
                    <p className="text-white text-xs sm:text-lg md:text-xl mb-2 sm:mb-4 md:mb-6 space-grotesk">
                      {banner?.description}
                    </p>
                  )}

                  {/* CTA Button */}
                  <Link
                    href="/international-shop"
                    className="space-grotesk text-white font-semibold px-4 sm:px-8 py-1.5 sm:py-3 
                      rounded-md border border-white shadow-lg hover:shadow-xl hover:scale-105 
                      transition-transform duration-300 ease-in-out
                      text-xs sm:text-lg md:text-xl hover:border-[#3A9E75] hover:bg-[#3A9E75] "
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
