"use client";

import { useState, useEffect } from "react";
import Container from "@/components/shared/Container";
import axiosInstance from "@/utils/axiosInstance";
import ProductListSkeleton from "../Skeletons/ProductListSkeleton";
import { cn } from "@/utils/cn";
import ProductCardByCategories from "./ProductCardByCategories";
import CategoryShopHeader from "./CategoryShopHeader";

export default function ShopByCategories({ slug }) {
  const [products, setProducts] = useState([]);
  const [catInfo, setCatInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [gridCols, setGridCols] = useState(5);
  const [availableGridOptions, setAvailableGridOptions] = useState([2, 3, 4]);

  const per_page = 15;

  const cardHeights = {
    2: "[750px]",
    3: "[500px]",
    4: "[450px]",
    5: "[320px]",
  };

  // Screen অনুযায়ী grid options
  const updateGridOptions = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setAvailableGridOptions([2]);
      if (gridCols > 2) setGridCols(2);
    } else if (width < 1024) {
      setAvailableGridOptions([2]);
      if (gridCols > 4) setGridCols(2);
    } else if (width < 1324) {
      setAvailableGridOptions([2, 3]);
    } else if (width < 1624) {
      setAvailableGridOptions([2, 3, 4]);
    } else {
      setAvailableGridOptions([2, 3, 4, 5]);
    }
  };

  useEffect(() => {
    updateGridOptions();
    window.addEventListener("resize", updateGridOptions);
    return () => window.removeEventListener("resize", updateGridOptions);
  }, []);

  // Initial fetch / slug change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/categories/${slug}/with/products?page=1&per_page=${per_page}`
        );

        setProducts(data?.products?.data || []);
        setCatInfo(data?.category);
        setTotalPages(data?.products?.last_page || 1);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  // Load More handler
  const handleLoadMore = async () => {
    if (currentPage >= totalPages || loadingMore) return;

    try {
      setLoadingMore(true);

      const nextPage = currentPage + 1;

      const { data } = await axiosInstance.get(
        `/categories/${slug}/with/products?page=${nextPage}&per_page=${per_page}`
      );

      setProducts((prev) => [...prev, ...(data?.products?.data || [])]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Load more failed", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const productListSection = loading ? (
    <ProductListSkeleton />
  ) : products?.length > 0 ? (
    <>
      <div
        className={cn(
          "grid gap-6",
          gridCols === 2 && "grid-cols-2",
          gridCols === 3 && "grid-cols-3",
          gridCols === 4 && "grid-cols-4",
          gridCols === 5 && "grid-cols-5"
        )}
      >
        {products.map((product, i) => (
          <ProductCardByCategories
            key={i}
            product={product?.product}
            productFullData={product}
            cardHeight={cardHeights[gridCols]}
          />
        ))}
      </div>

      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={cn(
              "px-5 py-2 md:px-6 md:py-3 rounded border transition-all cursor-pointer",
              loadingMore
                ? "bg-gray-200 text-gray-500"
                : "bg-[#3A9E75] text-white hover:bg-[#286b4f]"
            )}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="text-center text-gray-600 text-lg py-10">
      No products found.
    </div>
  );

  return (
    <Container className="py-8 space-y-6">
      <CategoryShopHeader title={catInfo?.name} />

      {/* Grid Layout Selector */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {availableGridOptions.map((cols) => (
          <button
            key={cols}
            onClick={() => setGridCols(cols)}
            className={cn(
              "flex gap-[2px] p-1 border rounded hover:border-black transition-all",
              gridCols === cols ? "border-black bg-gray-100" : "border-gray-300"
            )}
          >
            {Array.from({ length: cols }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-5 w-2",
                  gridCols === cols ? "bg-black" : "bg-gray-400"
                )}
              />
            ))}
          </button>
        ))}
      </div>

      {productListSection}
    </Container>
  );
}