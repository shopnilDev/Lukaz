import Link from 'next/link'
import React from 'react'

export default function CategoryShopHeader({ title }) {
    return (
        <div className='bg-white p-4 md:p-10 text-center'>

            <h4 className='text-xl sm:text-2xl md:text-3xl lg:text-3xl text-[#3A9E75] mb-2'>{title}</h4>
            <div className='text-base text-gray-500'>
                <Link
                href="/"
                >Home / </Link>
                <span
                className='cursor-pointer'
                >{title}</span>
            </div>

        </div>
    )
}
