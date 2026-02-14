import { WishListContext } from "@/context/WishListContext";
import { getImageUrl } from "@/utils/helpers";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import toast from "react-hot-toast";

export default function ProductCardByCategories({ product,productFullData,cardHeight }) {
  const { state, dispatch } = useContext(WishListContext);

console.log("product from cate",product)


  const isInWishlist = (slug) => {
    const exists = state.items.find(
      (item) => item?.productData?.slug === slug
    );
    return exists;

  }


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

const heigth=40

  // console.log("product", product)

  return (
    <div

      className="bg-white rounded-sm  overflow-hidden transform transition-all duration-300 hover:shadow-lg  cursor-pointer"
    >
      <div className={`relative w-full h-${cardHeight} `}>
        <Link href={`/product/${product?.slug}`}>
          <Image
            src={getImageUrl("products", productFullData?.color_thumbnails)}
            alt="product image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-sm"
          />
        </Link>
        {(product?.regular_price && product?.discount_type == 1) && (


          <span className="absolute top-5 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
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

          {/* <Heart className="w-5 h-5 text-gray-700" /> */}
        </button>
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          {/* <p className="text-sm text-gray-500 font-medium mb-1">
            {product?.brand_name || "No Brand Found"}
          </p> */}
          {/* <p className="text-sm text-gray-500">
            {JSON.parse(product?.product_size).length} Colours
          </p> */}
        </div>
        <Link
          href={`/product/${product?.slug}`}
          className="text-md font-semibold text-gray-800 mb-2"
        >
          {product?.name}
        </Link>

        <Link
          href={`/product/${product?.slug}`}
          className="text-md font-semibold text-gray-800 mb-2"
        >
          <div className="flex gap-3 items-center mt-1">
            {product?.regular_price && (<p className="text-sm font-bold text-gray-900 line-through">
              Tk. {product?.regular_price}
            </p>)}
            <p className="text-sm font-bold text-[#3A9E75]">
              Tk. {product?.current_price}
            </p>

            {/* {product?.product_color && product?.product_color?.length > 0 && (
                                        <p className="text-sm text-gray-500">{product?.product_color?.length} Colours</p>
                                        )} */}
          </div>
        </Link>
      </div>
    </div>
  );
}
