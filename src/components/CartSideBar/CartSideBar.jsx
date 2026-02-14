'use client';

import React, { useContext, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { getImageUrl } from '@/utils/helpers';

export default function CartSideBar() {
const [visibleRight, setVisibleRight] = useState(false);
const { state,dispatch } = useContext(CartContext);

const cart = state?.items;

//  console.log("cart side bar", cart)

  const increaseQuantity = (product_id, selectedColor, selectedSize) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: { product_id, selectedColor, selectedSize },
    });
  };

  const decreaseQuantity = (product_id, selectedColor, selectedSize) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: { product_id, selectedColor, selectedSize },
    });
  };


  const removeItem = (product_id,selectedColor,selectedSize) => {
 dispatch({ type: "REMOVE_ITEM", payload: {product_id,selectedColor,selectedSize} });
 toast.success(` Remove from cart`);
  };

// total from the real cart
const totalPrice = cart.reduce((sum, item) => {
      const price=item?.productData?.product?.current_price
      const qty = Number(item?.quantity) || 2;
      return sum + price * qty; 
}, 0);

  return (
    <div className="relative">
      <div className="flex gap-2 justify-center items-center p-2 relative cursor-pointer">
        <ShoppingBag size={23} onClick={() => setVisibleRight(true)} />
        {cart?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {cart?.length}
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
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cart?.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 ">
              {cart.map((item,i) => (
                <div
                  key={i}
                  className="flex gap-3 p-2 rounded-xl shadow-sm bg-white"
                >
                  {/* {
                    item?.gallaries?.foreach((item,i)=>item?.slug=="31_gray")
                  } */}
                  <Image
                  src={getImageUrl("products",item?.selectedItemImage)}
                    // src={getImageUrl("products",item?.productData?.gallaries?.find((varient)=>varient?.slug==item?.selectedColourSlug).color_icon_small)}
                    alt=""
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                        href={`/product/${item?.selectedColourSlug}`}
                        className="text-sm font-medium text-gray-800">
                          {item?.productData?.product?.name.slice(0,25)}
                          </Link>
                           {/* <p className="text-[12px] text-gray-700 mt-0.5">
                          {item?.selectedColor}-{item?.selectedSize}
                        </p> */}
                        <p className="text-[12px] text-gray-500 mt-0.5">
                          ৳ {item?.productData?.product?.current_price} × {item?.quantity}
                        </p>
                       <div className='flex gap-4 items-center '>
                         <p className="text-sm font-semibold text-[#3A9E75]">
                          ৳ {item?.productData?.product?.current_price * item.quantity}
                        </p>
                         <div className="flex items-center gap-2">
                      <button
                         onClick={() =>
                            decreaseQuantity(
                              item?.productData?.product_id,
                              item?.selectedColor,
                              item?.selectedSize
                            )
                          }
                        className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 p-1 rounded-full"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="px-2 text-sm">{item?.quantity}</span>
                      <button
                        onClick={() =>
                              increaseQuantity(
                                item?.productData?.product_id,
                                item?.selectedColor,
                                item?.selectedSize
                              )
                            }
                        className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 p-1 rounded-full"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                       </div>
                      </div>
                      <button
                        onClick={() => removeItem(item?.productData?.product_id,item?.selectedColor,item?.selectedSize)}
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

          {cart.length > 0 && (
            <div className="mt-6">
              <div className="flex  justify-between mb-4  font-semibold">
                <span>Total</span>
                <span><span className='text-md'>৳</span> {totalPrice}</span>
              </div>
              <Link
              onClick={()=>setVisibleRight(false)}
                href="/checkout"
                className="block bg-[#3A9E75] hover:bg-[#318b66] text-white text-center py-2.5 rounded-md transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}
