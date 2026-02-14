"use client";

import { getImageUrl } from "@/utils/helpers";
import { WishListContext } from "@/context/WishListContext";
import { useContext } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export const RelatedProductCard = ({ product }) => {
  const { state, dispatch } = useContext(WishListContext);

  const isInWishlist = (slug) => {
    return state.items.some((item) => item?.productData?.slug === slug);
  };

  const handleWishList = (product) => {
    const payload = {
      productData: product,
      id: crypto.randomUUID(),
      product_name: product?.product_name,
      current_price: product?.current_price,
      slug: product?.slug,
      selectedSize: "",
      selectedColor: product?.color,
      selectedColourSlug: product?.slug,
      selectedItemImage: product?.color_icon,
    };

    if (isInWishlist(product?.slug)) {
      dispatch({ type: "REMOVE_ITEM", payload: product?.slug });
      toast.success(`Removed from wishlist!`);
    } else {
      dispatch({ type: "ADD_ITEM", payload });
      toast.success(`Added to wishlist!`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative">


   {/* showing discount   */}
      {(product?.regular_price && product?.discount_type == 1) && (
        <span className="absolute top-5 left-4 bg-black text-white px-3 py-1 text-xs font-medium shadow-sm">
          -{Math.floor(100 / product?.regular_price * product?.discount)}%
        </span>
      )
      }
      {(product?.regular_price && product?.discount_type != 1) && (

        <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          -{product?.discount}
        </span>
      )
      }




      {/* Wishlist Button */}
      <button
        onClick={() => handleWishList(product)}
        className={`cursor-pointer absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition ${isInWishlist(product?.slug) ? "text-red-500" : "text-gray-600"
          }`}
      >
        <Heart
          className={`w-5 h-5 ${isInWishlist(product?.slug) ? "fill-red-500 text-red-500" : ""
            }`}
        />
      </button>

      {/* Product Image */}
      <Link
        href={`/product/${product?.slug}`}
      >
        <div
          className="aspect-square overflow-hidden"
        >
          <img
            src={getImageUrl("products", product?.color_thumbnails)}
            alt={product?.product_name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link
          href={`/product/${product?.slug}`}
          className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product?.product_name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">
            TK. {product?.current_price}
          </span>
          {product?.regular_price && (
            <span className="text-sm text-gray-500 line-through">
              TK. {product?.regular_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
