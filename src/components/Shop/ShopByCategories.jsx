"use client";

import { useState, useEffect } from "react";
import Container from "@/components/shared/Container";
import axiosInstance from "@/utils/axiosInstance";
import ProductCardShopPage from "./ProductCardShopPage";
import ProductListSkeleton from "../Skeletons/ProductListSkeleton";
import Pagination from "../shared/Pagination";
import { cn } from "@/utils/cn";
import ProductCardByCategories from "./ProductCardByCategories";
import CategoryShopHeader from "./CategoryShopHeader";

export default function ShopByCategories({ slug }) {
  const [products, setProducts] = useState([]);
   const [catInfo, setCatInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gridCols, setGridCols] = useState(5); // Default for mobile
  const [availableGridOptions, setAvailableGridOptions] = useState([2, 3, 4]); // Adjust dynamically based on screen size

  const per_page = 15;

  // Dynamic card heights for different layouts
  const cardHeights = {
    2: "[750px]", // Taller for 2 columns
    3: "[500px]", // Medium for 3 columns
    4: "[450px]", // Smaller for 4 columns
    5: "[320px]", // Smallest for 5 columns
  };

  // Detect screen size and set available grid options
  const updateGridOptions = () => {
    const width = window.innerWidth;

    if (width < 640) {
      // Mobile: allow max 2 columns
      setAvailableGridOptions([2]);
      // setGridCols(2)
      if (gridCols > 2) setGridCols(2);
    } else if (width < 1024) {
      // setGridCols(2)
      // Tablet: allow up to 4 columns
      setAvailableGridOptions([2]);
      
      if (gridCols > 4) setGridCols(4);
    } 
  
    else if (width < 1324) {
      // Tablet: allow up to 4 columns
      setAvailableGridOptions([2, 3]);
      // setGridCols(3)
      if (gridCols > 4) setGridCols(4);
    } 
      else if (width < 1624) {
      // Tablet: allow up to 4 columns
      setAvailableGridOptions([2,3,4]);
        // setGridCols(4)
      if (gridCols > 4) setGridCols(4);
    } 
    else {
      // Desktop: allow up to 5 columns
      setAvailableGridOptions([2, 3, 4, 5]);
        // setGridCols(5)
    }
  };

  useEffect(() => {
    updateGridOptions();
    window.addEventListener("resize", updateGridOptions);
    return () => window.removeEventListener("resize", updateGridOptions);
  }, [gridCols]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/categories/${slug}/with/products?page=${currentPage}&per_page=${per_page}`
        );

        setProducts(data?.products?.data || []);
        setCatInfo(data?.category)
        setTotalPages(data?.products?.last_page || 1);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, slug]);

  // Product list rendering
  const productListSection = loading ? (
    <ProductListSkeleton />
  ) : products?.length > 0 ? (
    <div
      className={cn(
        "grid gap-6 ",
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
          cardHeight={cardHeights[gridCols]} // Pass dynamic height
        />
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-600 text-lg py-10">
      No products found.
    </div>
  );

  return (
    <Container className="py-8 space-y-6">
      <CategoryShopHeader title={catInfo?.name}/>
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

      {/* Product Grid */}
      {productListSection}

      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  );
}
