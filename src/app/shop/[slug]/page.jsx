
import ShopByCategories from '@/components/Shop/ShopByCategories'
import React from 'react'

export default async function page({ params }) {
 const { slug } =await params;

  return (
    <div className=''>
      <ShopByCategories slug={slug}/>
    </div>
  )
}
