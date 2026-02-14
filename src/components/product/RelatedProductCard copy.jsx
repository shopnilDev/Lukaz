"use client"

import { getImageUrl } from "@/utils/helpers";
import { WishListContext } from "@/context/WishListContext";
import { useContext } from "react";


export const RelatedProductCard = ({ product }) => {

 const { state,dispatch } = useContext(WishListContext);
 
  const isInWishlist = (slug)=>{
   const exists = state.items.find(
        (item) => item?.productData?.slug === slug
      );
        return exists;
    
    }
// console.log("wishlist state",state)

  const handleWishList = (product) => {

    const payload={
      productData:product,
      id: crypto.randomUUID(),
      product_name:product?.product_name,
      current_price:product?.current_price,
      slug:product?.slug,
      selectedSize:"",
      selectedColor:product?.color,
      selectedColourSlug:product?.slug,
      selectedItemImage:product?.color_icon,
    }
    // console.log("test", isInWishlist(product?.id))
    if (isInWishlist(product?.slug)) {
      dispatch({ type: "REMOVE_ITEM", payload: product?.slug });
      toast.success(`Remove from wishlist!`);
    } else {
      dispatch({ type: "ADD_ITEM", payload });
      toast.success(`Added to wishlist!`);
    }

    
  };







  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
     
      <div className="aspect-square overflow-hidden">
        <img
          src={getImageUrl("products",product?.color_thumbnails)}
          alt={product?.product_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

     
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product?.product_name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-1">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))} */}
          </div>
          {/* <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span> */}
        </div>

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
