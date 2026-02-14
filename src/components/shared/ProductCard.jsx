import { WishListContext } from "@/context/WishListContext";
import { getImageUrl } from "@/utils/helpers";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { state, dispatch } = useContext(WishListContext);

  // Check if product is already in wishlist
  const isInWishlist = (slug) => {
    const exists = state.items.find((item) => item?.productData?.slug === slug);
    return exists;
  };

  const handleWishList = (product) => {
    const payload={
      productData:product,
      id: crypto.randomUUID(),
    }

    // console.log("test", isInWishlist(product?.id));
    if (isInWishlist(product?.slug)) {
      dispatch({ type: "REMOVE_ITEM", payload: product?.slug });
      toast.success(`Remove from wishlist!`);
    } else {
      dispatch({ type: "ADD_ITEM", payload });
      toast.success(`Added to wishlist!`);
    }
  };

  return (
    <div className="bg-white rounded-sm  overflow-hidden transform transition-all duration-300 hover:shadow-lg  cursor-pointer">
      <div className="relative w-full h-40">
        <Image
           src={getImageUrl("products", product?.color_thumbnails)}
          alt={product?.product_name}
          fill // Use fill to cover the parent div
          style={{ objectFit: "cover" }} // Ensure image covers the area
          className="rounded-t-sm" // Apply rounded corners to the top of the image
        />
        {/* {product?.freeDelivery && (
          <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            Free Express Delivery
          </span>
        )} */}
        <button
          onClick={() => handleWishList(product)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full 
                             shadow-sm hover:scale-105 transition-transform focus:outline-none
                              focus:ring-2 focus:ring-gray-300 cursor-pointer"
          aria-label="Add to wishlist"
        >
          {isInWishlist(product?.slug) ? (
            <Heart fill="red" stroke="red" />
          ) : (
            <Heart />
          )}

        
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 font-medium mb-1">
          {product?.brand_name || "No Brand Found"}
        </p>
        <h2 className="text-md font-semibold text-gray-800 mb-2">
         {product?.product_name}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-[#3A9E75]">
           ৳ {product?.current_price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
              {JSON.parse(product?.product_size).length} Colours
            </p>
        </div>
      </div>
    </div>
  );
}
