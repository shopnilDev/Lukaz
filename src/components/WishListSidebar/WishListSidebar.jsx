"use client";

import React, { useContext, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { WishListContext } from "@/context/WishListContext";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { getImageUrl } from "@/utils/helpers";

export default function WishListSideBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  const { state, dispatch } = useContext(WishListContext);
  const wishlist = state.items;

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.success(` Remove from wishlist`);
  };


  return (
    <div className="relative">
      <div className="flex gap-2 justify-center items-center p-2 relative cursor-pointer">
        <Heart size={23} onClick={() => setVisibleRight(true)} />
        {wishlist?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {wishlist?.length}
          </span>
        )}
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        className="w-[90%]  sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] p-4"
      >
        <div className="flex flex-col h-full ">
          <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>

          {wishlist?.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {wishlist?.map((item,i) => (
                <div
                  key={i}
                  className="flex gap-3 p-2 rounded-xl shadow-sm bg-white"
                >
                  <Image
                    src={getImageUrl("products",item?.selectedItemImage)}
                    alt={item?.product_name}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                        href={`/product/${item?.slug}`}
                        className="text-sm font-medium text-gray-800">
                          {item?.product_name?.slice(0,45)}
                        </Link>
                        <div className="flex gap-3 items-center mt-1.5 ">
                          <p className="text-sm font-semibold text-[#3A9E75] ">
                          ৳ {item?.current_price}
                        </p>
                          <p className="text-sm font-semibold text-gray-400 ">
                          ৳ {item?.selectedColor}
                        </p>
                        {/* <button 
                        onClick={()=>handleAddToCart(item?.productData,
                          item?.productData?.colors[0],item?.productData?.sizes[0])}
                        className="text-xs bg-[#3A9E75] text-white
                         hover:bg-[#2d7758] px-2 py-1 cursor-pointer
                        rounded-sm">Add To Cart</button> */}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item?.productData?.slug)}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        
        </div>
      </Sidebar>
    </div>
  );
}
