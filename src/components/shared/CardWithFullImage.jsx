import { getImageUrl } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'

export default function CardWithFullImage({ item }) {
  return (
    <div className="h-[420px] rounded-md relative overflow-hidden group cursor-pointer">
      {/* Zoomable background */}
      <Link
      href={`/product/${item?.slug}`}
        className="absolute inset-0 bg-cover bg-center transition-transform
         duration-700 scale-100  group-hover:scale-105"
        style={{ backgroundImage: `url(${getImageUrl("products", item?.color_thumbnails)})` }}
      />
      
      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> */}

   
      {/* <Link 
      href={`/product/${item?.slug}`}
      className="absolute bottom-8 left-4 right-4 text-white text-2xl font-bold z-10">
        {item?.product_name} ({item?.color})
      </Link> */}
    </div>
  )
}
