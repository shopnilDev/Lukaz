"use client"
import { useFilter } from '@/context/FilterContext';
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Sneakers', href: '/shop/sneakers', id: 13 },
  { label: 'Outfits', href: '/shop/outfits', id: 16 },
  { label: 'Luxury', href: '/shop/luxury', id: 22 },
  { label: 'International Deal', href: '/international-shop' },
];

export default function SecondMenu() {

  const { dispatch: dispatchFilterProduct } = useFilter();
  const pathname = usePathname();

  // get last part of url
  const lastPath = pathname.split('/').filter(Boolean).pop();

  const handleCategoryFilter = (item) => {
    // if(item?.id){
    // dispatchFilterProduct({ type: "SET_CATEGORIES", payload: item?.id });
    // }
  }

  return (
    <div>

      <div className="px-2 sm:px-4">
        <div className="flex items-center justify-between ">


          {/* Logo */}
          <div className="w-[470px] flex justify-center">
         
          </div>

          {/* Search + Icons */}
          <div className="w-full flex justify-end items-center gap-2  ">
            <div className="flex w-full justify-between ">
              <div className="w-full flex justify-between py-1   shadow-sm  ">

                {menuItems?.map((item, index) => {
                  const itemLastPath = item?.href?.split('/').filter(Boolean).pop();
                  const isActive = lastPath === itemLastPath;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => handleCategoryFilter(item)}
                      className={`text-xs sm:text-sm font-semibold  px-2 py-1.5 md:px-4 md:py-2 rounded-sm transition
                      ${isActive
                          ? 'bg-[#ff5b2e] text-white font-bold'
                          : 'bg-[#3a9e741c] text-black hover:bg-[#ff5b2e]  hover:text-white'
                        }`}
                    >
                      {item?.label}
                    </Link>
                  )
                })}
              </div>
              <div className='w-[400px] '>

              </div>
            </div>

          

          </div>
        </div>
      </div>




    </div>
  )
}