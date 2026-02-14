"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RelatedProductCard } from "./RelatedProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { BASE_URL_BACKEND } from "@/utils/baseUrl";

export default function RelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryIds = product?.product?.category_ids || [];

  useEffect(() => {
    if (categoryIds.length === 0) return;

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        // Convert array ["18", "10", "19"] => "18,10,19"
        const ids = categoryIds.join(",");

        const res = await fetch(
          `${BASE_URL_BACKEND}/api/products?category_id=${ids}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await res.json();
        setRelatedProducts(data?.data?.data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryIds]);


  // console.log("releted items",relatedProducts)

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-700 text-lg bg-[#ECF5F1] p-3">
          Loading related products...
        </p>
      ) : relatedProducts.length > 0 ? (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A9E75] mb-8">
            You Might Also Like
          </h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {relatedProducts.map((relatedProduct, i) => (
              <SwiperSlide key={i}>
                <RelatedProductCard product={relatedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg bg-[#ECF5F1] p-3">
          No Related Products Found
        </p>
      )}
    </div>
  );
}
