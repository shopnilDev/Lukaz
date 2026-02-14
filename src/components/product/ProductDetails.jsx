"use client"

import { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import { AddReviewModal } from "@/components/shared/AddReviewModal"
import Container from "@/components/shared/Container"
import { Loader2, Minus, Plus, Slice } from "lucide-react"
import SizeGuide from "@/components/product/SizeGuide"
import { CartContext } from "@/context/CartContext"
import toast from "react-hot-toast"
import Reviews from "@/components/product/Reviews"
import { useParams } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { getImageUrl } from "@/utils/helpers"
import { addToWishList } from "@/utils/addToWishList"
import { WishListContext } from "@/context/WishListContext"
import Link from "next/link"
import RelatedProducts from "@/components/product/RelatedProducts"
import ProductDetailsSkeleton from "@/components/Skeletons/ProductDetailsSkeleton"
import Image from "next/image"
import ShipingTimeLine from "./ShipingTimeLine"


const features = [
  "React foam midsole for lightweight comfort",
  "Air Max 270 unit for maximum cushioning",
  "Breathable mesh upper",
  "Rubber outsole for durability",
  "Heel pull tab for easy on and off",
]



export default function ProductDetails({ product }) {
  //   const { slug } = useParams();
  const { dispatch } = useContext(CartContext);
  const { state: wishListState, dispatch: wishListDispatch } = useContext(WishListContext);
  //   const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false)
  const [selectedColourSlug, setSelectedColourSlug] = useState(null)
  const [selectedItemImage, setSelectedItemImage] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [mainImage, setMainImage] = useState("")
  const [customSlug, setCustomSlug] = useState("")
  const [selectedItemFromAdditional, setSelectItemFromAdditional] = useState({})


  useEffect(() => {
    const img = product?.color_thumbnails
    setMainImage(img)
    setSelectedColor(product?.color)
    setSelectedColourSlug(product?.slug)

    setSelectedItemImage(product?.color_icon_small)
  }, [product]);

  useEffect(() => {
    const selectedtem = product?.additionals.find((item) => item?.additional_key == customSlug) || {}
  
    setSelectItemFromAdditional(selectedtem)
  }, [customSlug]);



  const handleColorSelect = (item) => {
    setSelectedColor(item?.color)
    setSelectedColourSlug(item?.slug)
    setMainImage(item?.color_thumbnails)
    setSelectedItemImage(item?.color_icon_small)
    setCustomSlug(`${product?.product_id}_${item?.color?.toLowerCase()}_${selectedSize}`)

  }

  const handleSizeSelect = (item) => {
    setSelectedSize(item)
    setCustomSlug(`${product?.product_id}_${selectedColor.toLowerCase()}_${item}`)
  }



  const isPreOrderRequired = () => {

    if (product?.product?.is_pre_order == 1 && selectedItemFromAdditional?.stocks_sum_stock == 0) {
      return true;
    }
    return false;
  }

  const isStockAvailable = () => {
    return selectedItemFromAdditional?.stocks_sum_stock > 0
  }

  const isButtonDisable = () => {


    if (product?.product?.is_pre_order == 0 && selectedItemFromAdditional?.stocks_sum_stock == 0) {
      return true;
    }
    return false;
  }

  const handleAddToCart = () => {
    const payload = {
      productData: product,
      quantity,
      selectedSize,
      selectedColor,
      selectedColourSlug,
      selectedItemImage,
      id: crypto.randomUUID(),
      preOrder: isPreOrderRequired()
    }
    // console.log("cart payload",payload)
    dispatch({ type: "ADD_ITEM", payload });
    toast.success(` Added to cart`);
  }

// for buy now button
  const handleBuyNow= () => {
    const payload = {
      productData: product,
      quantity,
      selectedSize,
      selectedColor,
      selectedColourSlug,
      selectedItemImage,
      id: crypto.randomUUID(),
      preOrder: isPreOrderRequired()
    }
    // console.log("cart payload",payload)
    dispatch({ type: "ADD_ITEM", payload });
   
  }


  const isInWishlist = (slug) => {
    const exists = wishListState.items.find(
      (item) => item?.productData?.slug === slug
    );
    return exists;

  }


  const handlewishList = () => {
    const payload = {
      productData: product,
      id: crypto.randomUUID(),
      product_name: product?.product?.name,
      current_price: product?.product?.current_price,
      slug: product?.slug,
      selectedSize,
      selectedColor,
      selectedColourSlug,
      selectedItemImage: mainImage,
    }


    if (isInWishlist(selectedColourSlug)) {
      wishListDispatch({ type: "REMOVE_ITEM", payload: product?.slug });
      toast.success(`Remove from wishlist!`);
    } else {
      wishListDispatch({ type: "ADD_ITEM", payload });
      toast.success(`Added to wishlist!`);
    }

  }

  // console.log("product details", product)



  if (loading) {
    return (
      <>
        <ProductDetailsSkeleton />
      </>
    );
  }

  if (error || !product) {
    return <p className="text-center text-red-500">{error || "Product not found"}</p>;
  }


  return (
    <Container className="pt-4 pb-10 md:py-10">
      {/* Breadcrumb */}
      <div className=" text-xs sm:text-sm flex items-center space-x-2  text-gray-500 mb-4 md:mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>

        <span>/</span>
        <Link href="/shop" className="hover:text-gray-700">
          Shop
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product?.product?.name}</span>
      </div>
      {/* Product Section */}

      {/* for small screen */}
      <div className="block md:hidden">
        <p className="text-sm text-gray-500 mb-0.5">{product?.product.brand?.name}</p>
        <h1 className="text-2xl font-bold text-gray-600 mb-2">{product?.product?.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.floor(product?.review_avg_rating)} />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product?.review?.length} reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6">
          {product?.product?.regular_price && (
            <>
              <span className="text-xl md:text-2xl  lg:text-3xl font-semibold text-gray-500 line-through">Tk {product?.product?.regular_price}</span>

            </>
          )}
          <span className="text-xl md:text-2xl  lg:text-3xl font-bold text-gray-900">Tk {product?.product?.current_price}</span>
          {product?.product?.regular_price && (
            <>
              {/* <span className="text-xl text-gray-500 line-through">৳ {product?.product?.regular_price}</span> */}
              <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded">
                SAVE {Math.floor(100 / product?.product?.regular_price * product?.product?.discount)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* for Big screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

        {/* Image Gallery */}
        <div className="space-y-2">
          <Swiper
            modules={[Pagination, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{ clickable: true }}
            className="aspect-square rounded-lg overflow-hidden"
          >

            <SwiperSlide >
              <img
                // src={"/placeholder.svg"}
                src={getImageUrl("products", mainImage)}
                alt={`${product?.product?.name} `}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>

          </Swiper>

          {/* Thumbnail Navigation */}
          <div className=" ">
            <Swiper
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              className="thumbs-swiper"
              breakpoints={{
                320: { slidesPerView: 4, spaceBetween: 2 },
                640: { slidesPerView: 5, spaceBetween: 2 },
                1024: { slidesPerView: 6, spaceBetween: 2 },
              }}
            >
              {product?.gallaries?.map((item, index) => (
                <SwiperSlide key={index} className="cursor-pointer ">
                  <div
                    onClick={() => handleColorSelect(item)}
                    className={`aspect-square rounded-lg overflow-hidden w-18 h-18 sm:w-24 sm:h-24  hover:border-teal-700  ${selectedColor === item?.color
                      ? "border-2 border-teal-700 "
                      : "  "

                      }`}>
                    <img
                      src={getImageUrl("products", item?.color_icon)}

                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 relative">
          <div>
            <div className="hidden md:block">
              <p className="text-sm text-gray-500 mb-0.5">{product?.product?.brand?.name}</p>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{product?.product?.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (


                      <StarIcon key={i} filled={i < Math.floor(4.5)} />

                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product?.review?.length} reviews)</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 mb-4">
              {product?.product?.regular_price && (
                <>
                  <span className="text-xl md:text-2xl  lg:text-3xl font-semibold text-gray-500 line-through">Tk {product?.product?.regular_price}</span>
                  {/* <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    ৳ {product?.product?.discount} OFF
                  </span> */}
                </>
              )}
              <span className="text-xl md:text-2xl  lg:text-3xl font-bold text-gray-900">Tk {product?.product?.current_price}</span>
              {product?.product?.regular_price && (
                <>
                  {/* <span className="text-xl text-gray-500 line-through">৳ {product?.product?.regular_price}</span> */}
                  <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded">
                    SAVE {Math.floor(100 / product?.product?.regular_price * product?.product?.discount)}%
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Stock Status */}
          {selectedSize &&
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full
               ${selectedItemFromAdditional?.stocks_sum_stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-gray-600">
                {selectedItemFromAdditional.stocks_sum_stock > 0 ? `In Stock (${selectedItemFromAdditional?.stocks_sum_stock})` : "Out of Stock"}
              </span>

            </div>}
          {/* Color Selection */}
          <div className="bg-gray-100 p-4 rounded-md">
            {selectedColor && (
              <p className="text-sm text-gray-600 mb-1 ">
                Selected: {selectedColor}
              </p>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">COLOR</h3>
            </div>

            <div className="flex gap-2 flex-wrap">
              {product?.gallaries?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => handleColorSelect(item)}
                  className={`relative w-13 h-13 border-2 rounded-md overflow-hidden
                     transition-all  ${selectedColor === item?.color
                      ? "border-gray-600 "
                      : "border-gray-300 hover:border-gray-400"

                    }`}
                  title={item?.color}
                >
                  <img
                    src={getImageUrl("products", item?.color_icon)}
                    alt={item.color}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="bg-gray-100 p-4 rounded-md">
            {/* Selected Size */}
            {selectedSize && (
              <p className="text-sm text-gray-600 mb-1">
                Selected: Size {selectedSize}

              </p>
            )}

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">SELECT SIZE</h3>
              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="text-sm text-gray-900 underline hover:text-gray-700"
              >
                Size Chart
              </button>
            </div>

            {/* Size Options */}
            <div className="flex gap-1.5 md:gap-2 flex-wrap">
              {product?.product?.size?.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSizeSelect(item)}
                  className={`w-10 h-10 border-2 rounded-md flex items-center justify-center text-sm font-medium transition-all ${selectedSize === item
                    ? "border-gray-900 bg-gray-900 text-white"
                    : item?.stock < 0
                      ? "border-gray-300 hover:border-gray-500 text-gray-900"
                      : "border-gray-200 text-gray-400 "
                    }`}
                >
                  {item}

                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>

            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 bg-[#ECF5F1] hover:bg-gray-100 rounded-l-md ">
                <Minus size="18" />
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}
                className="p-3 bg-[#ECF5F1] hover:bg-gray-100 rounded-r-md ">
                <Plus size="18" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className=" ">
            {selectedSize == null || selectedColor == null ?
              <span className="text-[13px] sm:text-base cursor-pointer w-full border border-gray-300 text-gray-800 py-3 px-3 sm:px-6 rounded-md font-semibold hover:border-gray-500 hover:bg-gray-100 shadow-sm transition-all duration-300">
                Select Size and colour to place order
              </span>
              :
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href="/checkout"
                  onClick={handleBuyNow}
                  disabled={isButtonDisable()}
                  className={`w-full cursor-pointer py-3 px-6 text-center rounded-md font-semibold shadow-md hover:shadow-lg
                   transition-all duration-300 disabled:cursor-not-allowed 
                    ${isPreOrderRequired()
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-600"
                    : "  bg-[#3A9E75] text-white  disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-600"
                    }
                    `}
                >
                   {isPreOrderRequired() ? "Pre-Order" : "Buy Now"}
                  
                </Link>
              
                {isPreOrderRequired() ? <></> :  <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisable()}
                  className={`w-full cursor-pointer py-3 px-6 rounded-md font-semibold shadow-md hover:shadow-lg disabled:cursor-not-allowed transition-all duration-300 ${isPreOrderRequired()
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-600"
                    : "bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-600"
                    }`}
                >
                  {isPreOrderRequired() ? "Pre-Order" : "Add to Cart"}
                </button> }

                <button
                  onClick={handlewishList}
                  className=" cursor-pointer w-full border border-gray-300 text-gray-800 py-3 px-6 rounded-md font-semibold hover:border-gray-500 hover:bg-gray-100 shadow-sm transition-all duration-300">
                  Add to Wishlist
                </button>
              </div>
            }


          </div>
          <div className=" flex flex-wrap gap-3  justify-start items-center ">

            <Image
              src="/images/payments/Bkash.png"
              alt="Bkash"
              width={60}
              height={30}
            />

            <Image
              src="/images/payments/Nagad.png"
              alt="nagad"
              width={60}
              height={30}
              className=""
            />
            <Image
              src="/images/payments/Visa.png"
              alt="visa"
              width={50}
              height={30}
              className=""
            />
            <Image
              src="/images/payments/Mastercard.png"
              alt="mastercard"
              width={45}
              height={30}
              className=""
            />
          </div>
          {/* Features */}
          <div>
            <p className="text-md font-medium text-[#3A9E75] mb-2">Estimated days: {product?.product?.pre_order_days}</p>
            <h3 className="text-md font-medium text-gray-900 mb-3">Important Notes</h3>
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: product?.product?.pre_order_notes || "" }}
            />


          </div>
        </div>
      </div>

      {/* Product Description */}
      {product?.product?.description ? <div className="mb-16 overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3A9E75] mb-6">Product Description</h2>
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product?.product?.description || "No Product Description" }}
        />

      </div>
        :
        <p className="text-center text-gray-700 text-lg bg-[#ECF5F1] p-3 mb-6">No Product Description</p>
      }


      <ShipingTimeLine />

      {/* Reviews Section */}
      <div className="mb-16">
        <Reviews reviews={product?.review} />
      </div>


      <RelatedProducts product={product} />


      {/* Size Selection Modal */}
      <SizeGuide
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}

      />



      {/* Custom Styles */}
      <style jsx global>{`
        .thumbs-swiper .swiper-slide-thumb-active div {
          border-color: #374151 !important;
        }
                
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Container>
  )
}

const StarIcon = ({ filled = true, className = "w-4 h-4" }) => (
  <svg
    className={`${className} ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)






const ProductCard = ({ product }) => {

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">

      <div className="aspect-square overflow-hidden">
        <img
          src={getImageUrl("products", product?.color_icon)}
          alt={product?.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>


      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product?.name}
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
            ${product?.current_price}
          </span>
          {product?.regular_price && (
            <span className="text-sm text-gray-500 line-through">
              ${product?.regular_price}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};







