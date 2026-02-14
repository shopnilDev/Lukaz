"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import CardWithFullImage from "../shared/CardWithFullImage";



export default function FeatureItems({ featureItems }) {
  // console.log("featureItems", featureItems)
  return (
    <section className="py-6">
      <div className="mb-6 border-b-2 border-[#3A9E75]">
        <h1 className="font-semibold text-xl sm:text-2xl mb-2 space-grotesk ">Best Items</h1>
      </div>

      {/* Mobile & Desktop Swiper */}
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          0: { slidesPerView: 1.3 },
          524: { slidesPerView: 2 },
          768: { slidesPerView: 2.4 },
          // 1024: { slidesPerView: 5.4 },   

          1024: { slidesPerView: 4 },
          1250: { slidesPerView: 4.4 },
          1624: { slidesPerView: 5.4 },
        }}
      >
        {featureItems?.map((product, i) => (
          <SwiperSlide key={i}>
            <CardWithFullImage item={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
