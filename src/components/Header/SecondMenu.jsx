"use client"
import { useFilter } from '@/context/FilterContext';
import Link from 'next/link';
import React from 'react'

const menuItems = [
  { label: 'All Items', href: '/shop', },
  { label: "Men's", href: '/shop/mens',id:9 },
  { label: "Women's", href: '/shop/womens',id:11  },
  { label: "Kids'", href: '/shop/kids',id:20 },
  { label: 'Sneakers', href: '/shop/sneakers',id:13 },
  { label: 'Outfits', href: '/shop/outfits',id:16 },
  { label: 'Slide', href: '/shop/slide',id:22 },
  { label: 'Bags', href: '/shop/bags',id:8 },
  { label: 'Accessories', href: '/shop/accessories',id:21 },
  // { label: 'Brands', href: '/brands', },
  { label: 'Our Outlets', href: '/outlets' },
  { label: 'International Deal', href: '/international-shop'},
];



export default function SecondMenu() {
const { dispatch:dispatchFilterProduct } = useFilter();

const handleCategoryFilter=(item)=>{
    
    // if(item?.id){
    // dispatchFilterProduct({ type: "SET_CATEGORIES", payload: item?.id });
    // }
   
    }


  return (
    <div>
      <div className="hidden lg:flex justify-center gap-1 py-1 bg-white shadow-sm flex-wrap">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={()=>handleCategoryFilter(item)}
          
            className={`text-sm font-semibold px-4 py-2 rounded-md transition ${
              item.label === 'All Items'
                ? 'bg-[#ff5b2e] text-white font-bold'
                : 'text-black hover:text-[#3A9E75]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>  
    </div>
  )
}
