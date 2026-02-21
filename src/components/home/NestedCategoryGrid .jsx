
import React from 'react';
import { getShopByGender } from '@/utils/actions';
import NestedCategoryGridCard from '../shared/NestedCategoryGridCard';




export default async function NestedCategoryGrid () {

const shopbyGender=await getShopByGender()
// console.log("shop by", shopbyGender)

  return (
  <div className='py-10'>
    <div className="mb-6 border-b-2 border-[#3A9E75]">
        <h1 className="font-semibold text-xl sm:text-2xl mb-2 space-grotesk ">Shop by</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {shopbyGender?.map((item, idx) => (
        <NestedCategoryGridCard
          key={idx}
         
          item={item}
        />
      ))}
    </div>
  </div>
  );
}
