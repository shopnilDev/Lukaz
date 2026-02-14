"use client"

import { useFilter } from '@/context/FilterContext';
import Link from 'next/link';
import React from 'react'


const menuItems = [
    { label: 'Shop Shoes', href: '/shop/run', id: 10 },
    { label: 'Shop Apparel', href: '/shop/outfits', id: 17 },
    { label: 'Shop Accessories', href: '/shop/accessories', id: null },
];





export default function WelcomeSection() {
    const { dispatch: dispatchFilterProduct } = useFilter();

    const handleCategoryFilter = (item) => {
        if (item?.id) {
            dispatchFilterProduct({ type: "SET_CATEGORIES", payload: item?.id });
        }
    }


    return (
        <section className="text-center pt-14 px-4">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-6">
                Welcome to the LukazBd
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 max-w-2xl mx-auto mb-4 text-base">
                Whether you're running for fun or competitively, having the right kit is a must.
                Not only will it greatly reduce your risk of injuries, but it'll help you to really look the part!
            </p>

            {/* Description */}
            <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-base">
                Sportsshoes.com stocks everything you’ll need; from men's running shoes to gym clothes,
                right down to the all-important accessories. We also sell a huge range of men's running
                clothes from leading brands such as adidas, Saucony and Asics, all at fantastically low
                prices so you can pound the streets, the track or the trail in real style!
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mx-auto">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item?.href}
                        onClick={() => handleCategoryFilter(item)}
                        className="px-4 py-2 border border-gray-400 rounded hover:bg-[#3A9E75] hover:text-white"
                    >
                        {item.label}
                    </Link>
                ))}
                
            </div>
        </section>
    )
}
