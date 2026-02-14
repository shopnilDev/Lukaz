'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Running Shoes', image: '/images/shoe/2.jpg' },
  { name: 'Sneakers', image: '/images/catImg/11.jpg' },
  { name: 'Boots', image: '/images/shoe/5.jpg' },
   { name: 'Panjabi', image: '/images/catImg/6.jpg' },
  { name: 'T-Shirts', image: '/images/catImg/1.jpg' },
  { name: 'Jackets', image: '/images/catImg/5.jpg' },
  { name: 'Womens', image: '/images/catImg/9.jpg' },
  { name: 'Formal Shoes', image: '/images/catImg/10.jpg' },
  { name: 'Shirts', image: '/images/catImg/shirt.webp' },
  { name: 'Accessories', image: '/images/catImg/accessories.webp' },
  { name: 'Panjabi', image: '/images/catImg/panjabi.webp' },
  { name: 'T-Shirts', image: '/images/catImg/shirt.webp' },
  { name: 'Jackets', image: '/images/catImg/jacket.png' },
];

export default function ShopByCategoriesSlider() {
  useEffect(() => {
    // Ensure swiper navigation elements are mounted
  }, []);

  return (
    <div className="py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold space-grotesk">Shop by Categories</h2>
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button className="swiper-button-prev-custom w-10 h-10   hover:text-teal-500 cursor-pointer flex items-center justify-center">
            <ChevronLeft />
          </button>
          <button className="swiper-button-next-custom w-10 h-10  hover:text-teal-500 cursor-pointer flex items-center justify-center">
            <ChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 5.2 },
        }}
        modules={[Navigation]}
        onInit={(swiper) => {
          // Manually attach navigation buttons on mount
          swiper.params.navigation.prevEl = '.swiper-button-prev-custom';
          swiper.params.navigation.nextEl = '.swiper-button-next-custom';
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div 
            className="group h-[350px] rounded-md bg-cover bg-center relative overflow-hidden cursor-pointer">
                  <Link
                  href={`/shop/${cat?.name}`}
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  ></Link>

                  <Link 
                   href={`/shop/${cat?.name}`}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></Link>

                  <Link 
                  href={`/shop/${cat?.name}`}
                  className="absolute text-center bottom-7 left-4 right-4 text-white text-2xl font-bold">
                    {cat.name}
                  </Link>
                </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
