import { WishListContext } from "@/context/WishListContext";
import { getImageUrl } from "@/utils/helpers";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import toast from "react-hot-toast";

export default function ProductCardByCategories({ product, productFullData }) {
  const { state, dispatch } = useContext(WishListContext);

  const isInWishlist = (slug) =>
    state.items.some((item) => item?.selectedColourSlug == slug);

  const handleWishList = (product) => {
    const payload = {
      productData: product,
      id: crypto.randomUUID(),
      product_name: product?.name,
      current_price: product?.current_price,
      slug: productFullData?.slug,
      selectedSize: "",
      selectedColor: product?.color,
      selectedColourSlug: productFullData?.slug,
      selectedItemImage: productFullData?.color_icon,
    };

    if (isInWishlist(productFullData?.slug)) {
      dispatch({ type: "REMOVE_ITEM", payload: productFullData?.slug });
      toast.success(`Removed from wishlist!`);
    } else {
      dispatch({ type: "ADD_ITEM", payload });
      toast.success(`Added to wishlist!`);
    }
  };

  return (
    <div className="bg-white rounded-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg cursor-pointer">
      {/* ✅ Use aspect ratio to automatically adjust height */}
      <div className="relative w-full aspect-[4/5]">
        <Link 
         href={`/product/${productFullData?.slug}`}
        >
          <Image
            src={getImageUrl("products", productFullData?.color_thumbnails)}
            alt={product?.name || "Product image"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-sm"
          />
        </Link>

        {/* Discount Badge */}
      {(product?.regular_price && product?.discount_type == 1) && (


          <span className="absolute top-5 left-4 bg-black text-white px-3 py-1 rounded-md text-xs font-medium shadow-sm">
            -{Math.floor(100 / product?.regular_price * product?.discount)}%
          </span>
        )

        }


        {(product?.regular_price && product?.discount_type != 1) && (

          <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-md text-xs font-medium shadow-sm">
            -{product?.discount}
          </span>

        )
        }

        {/* Wishlist Button */}
        {/* <button
          onClick={() => handleWishList(product)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full 
            shadow-sm hover:scale-105 transition-transform focus:outline-none
            focus:ring-2 focus:ring-gray-300 cursor-pointer"
          aria-label="Add to wishlist"
        >
          {isInWishlist(productFullData?.slug) ? (
            <Heart fill="red" stroke="red" />
          ) : (
            <Heart />
          )}
        </button> */}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <Link
          href={`/product/${productFullData?.slug}`}
          className="text-sm sm:text-base font-semibold text-gray-800 mb-2 block"
        >
          {product?.name}
        </Link>

        <div className="flex gap-3 items-center mt-1">
          {product?.regular_price && (
            <p className="text-xs sm:text-sm font-bold text-gray-900 line-through">
              Tk. {product?.regular_price}
            </p>
          )}
          <p className="text-xs sm:text-sm font-bold text-[#3A9E75]">
            Tk. {product?.current_price}
          </p>
        </div>
      </div>
    </div>
  );
}
