"use client";

import React from "react";
import Container from "../shared/Container";

export default function ProductDetailsSkeleton() {
  return (
    <Container className=" py-10">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Skeleton */}
        <div>
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Product Name & Brand */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-6 w-64 bg-gray-200 rounded mb-3 animate-pulse"></div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              ))}
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Color Selection */}
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse"></div>
            <div className="flex items-center w-32 border border-gray-300 rounded-md">
              <div className="w-10 h-10 bg-gray-200 animate-pulse"></div>
              <div className="flex-1 h-10 bg-gray-200 animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 animate-pulse"></div>
            </div>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Notes */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1 animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <div className="h-6 w-56 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-60 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </Container>
  );
}
