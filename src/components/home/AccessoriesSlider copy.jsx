// 'use client';

// import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import ProductCard from '../Cards/ProductCard';
// import axiosInstance from '@/utils/axiosInstance';
// import ProductListSkeleton from '../Skeletons/ProductListSkeleton';





// export default function AccessoriesSlider() {
//     const [productsData, setProductsData] = useState()
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")



//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axiosInstance.get(`/products?category_id=21`)
//                 //  console.log("res products",res?.data?.data)
//                 setProductsData(res.data?.data || [])
//             } catch (err) {
//                 setError("Failed to fetch products")
//                 console.error(err)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchProducts()
//     }, [])




//     return (
//         <div className="py-10 relative">
//             <div className="flex justify-between items-center mb-6">
//                 <div className='flex gap-4  items-center'>
//                     <h2 className="text-xl sm:text-2xl font-semibold">Shop Accessories</h2>

//                 </div>

//                 <div className="hidden sm:flex gap-2">
//                     <button className="swiper-button-prev-custom w-10 h-10 hover:text-teal-500 cursor-pointer flex items-center justify-center">
//                         <ChevronLeft />
//                     </button>
//                     <button className="swiper-button-next-custom w-10 h-10 hover:text-teal-500 cursor-pointer flex items-center justify-center">
//                         <ChevronRight />
//                     </button>
//                 </div>
//             </div>



//             <Swiper
//                 slidesPerView={1.2}
//                 spaceBetween={16}
//                 navigation={{
//                     nextEl: '.swiper-button-next-custom',
//                     prevEl: '.swiper-button-prev-custom',
//                 }}
//                 breakpoints={{
//                     640: { slidesPerView: 2.2 },
//                     768: { slidesPerView: 3.2 },
//                     1024: { slidesPerView: 4.2 },
//                     1424: { slidesPerView: 5.4 },
//                     1624: { slidesPerView: 6.2 },
//                 }}
//                 modules={[Navigation]}
//                 onInit={(swiper) => {
//                     swiper.params.navigation.prevEl = '.swiper-button-prev-custom';
//                     swiper.params.navigation.nextEl = '.swiper-button-next-custom';
//                     swiper.navigation.init();
//                     swiper.navigation.update();
//                 }}
//             >
//                 {loading && <ProductListSkeleton />}

//                 {productsData?.data?.length > 0 ? <>
//                     {productsData?.data?.map((item) => (
//                         <SwiperSlide key={item.id}>
//                             <ProductCard item={item} />
//                         </SwiperSlide>
//                     ))}
//                 </> : <>
//                     <p>No Accessories Items Found! </p>
//                 </>}

//             </Swiper>
//         </div>
//     );
// }
