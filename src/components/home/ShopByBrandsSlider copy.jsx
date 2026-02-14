// 'use client';

// import { useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Link from 'next/link';
// import { getImageUrl } from '@/utils/helpers';
// import { useFilter } from '@/context/FilterContext';



// export default function ShopByBrandsSlider({brands}) {
//    const { dispatch:dispatchFilterProduct } = useFilter();
// // console.log("brands",brands)

//     const handleFilter=(brand)=>{
//     // console.log("from brands slider",brand)
    
//     dispatchFilterProduct({ type: "SET_BRANDS", payload: brand });
//     }


//   return (
//     <div className="py-10 relative">
//       <div className="flex justify-between items-center mb-6 border-b-2 border-[#3A9E75] pb-2">
//         <h2 className="text-xl sm:text-2xl font-semibold space-grotesk">Shop By Brands</h2>
//         {/* Navigation Buttons */}
//         <div className="flex gap-2">
//           <button className="swiper-button-prev-custom w-10 h-10   hover:text-teal-500 cursor-pointer flex items-center justify-center">
//             <ChevronLeft />
//           </button>
//           <button className="swiper-button-next-custom w-10 h-10  hover:text-teal-500 cursor-pointer flex items-center justify-center">
//             <ChevronRight />
//           </button>
//         </div>
//       </div>

//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={16}
//         navigation={{
//           nextEl: '.swiper-button-next-custom',
//           prevEl: '.swiper-button-prev-custom',
//         }}
//         breakpoints={{
//           0: { slidesPerView: 1.3 }, 
//           524: { slidesPerView: 2 },   
//           768: { slidesPerView: 2.4 },    
//           // 1024: { slidesPerView: 5.4 },   
          
//           1024: { slidesPerView: 4 }, 
//           1250: { slidesPerView: 4.4 }, 
//           1624: { slidesPerView: 5.4 }, 
//         }}
//         modules={[Navigation]}
//         onInit={(swiper) => {
//           // Manually attach navigation buttons on mount
//           swiper.params.navigation.prevEl = '.swiper-button-prev-custom';
//           swiper.params.navigation.nextEl = '.swiper-button-next-custom';
//           swiper.navigation.init();
//           swiper.navigation.update();
//         }}
//       >
//         {brands?.map((item, index) => (
//           <SwiperSlide key={index}>
//             <div 
//             className="group h-[350px] rounded-md bg-cover bg-center relative overflow-hidden cursor-pointer">
//                   <Link
//                   onClick={()=>handleFilter(item?.id)}
//                   href={`/shop`}
//                     className="absolute inset-0 bg-center bg-cover transition-transform duration-700 scale-100 group-hover:scale-105"
//                     style={{ backgroundImage: `url(${getImageUrl("brand",item?.thumbnail)})` }}
//                   ></Link>
//                     {/* dark overlay */}
//                   <Link 
//                    onClick={()=>handleFilter(item?.id)}
//                     href={`/shop`}
//                   //  href={`/shop/${item?.slug}`}
//                   className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                   
//                   </Link>

//                   <Link 
//                    onClick={()=>handleFilter(item?.id)}
//                   href={`/shop`}
//                   className="absolute text-center bottom-7 left-4 right-4 text-white text-2xl font-bold space-grotesk">
//                     {item.name}
//                   </Link>
//                 </div>

//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
