"use client";

import React, { useEffect, useState, useRef } from "react";
import { RelatedProductCard } from "./RelatedProductCard";
import { BASE_URL_BACKEND } from "@/utils/baseUrl";

export default function RelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL_BACKEND}/api/products?category_id=1042&page=1`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await res.json();
        setRelatedProducts(data?.data?.data || []);
        setTotalPages(data?.data?.last_page || 1);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;

      const res = await fetch(
        `${BASE_URL_BACKEND}/api/products?category_id=1042&page=${nextPage}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch related products");
      }

      const data = await res.json();
      setRelatedProducts((prev) => [...prev, ...(data?.data?.data || [])]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Load more failed", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && currentPage < totalPages) {
          handleLoadMore();
        }
      },
      { rootMargin: "600px", threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [currentPage, totalPages, loadingMore]);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-700 text-lg bg-[#ECF5F1] p-3">
          Loading related products...
        </p>
      ) : relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A9E75] mb-8">
            You Might Also Like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {relatedProducts.map((relatedProduct, i) => (
              <RelatedProductCard key={i} product={relatedProduct} />
            ))}
          </div>

          {/* Infinity Scroll Target */}
          {currentPage < totalPages && (
            <div ref={observerRef} className="flex justify-center mt-10 min-h-[40px] items-center">
              {loadingMore ? (
                <div className="flex gap-2 items-center text-gray-500">
                  <span className="w-5 h-5 border-2 border-gray-300 border-t-[#3A9E75] rounded-full animate-spin"></span>
                  Loading more...
                </div>
              ) : (
                <div className="h-10 w-full"></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
