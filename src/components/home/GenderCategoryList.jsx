
import React from 'react';
import GenderCategoryCard from '../shared/GenderCategoryCard';
import { getShopByGender } from '@/utils/actions';


const cardData = [
  {
    catId:9,
    title: "Men's",
    image: '/images/catImg/m1.jpg', // Replace with real image paths
    buttons: ['Shop Shoes', 'Shop Apparel', 'Shop Accessories'],
    childCatIds:[10,17,21]
  },
  {
    catId:11,
    title: "Women's",
    image: '/images/catImg/w1.jpg',
    buttons: ['Shop Shoes', 'Shop Apparel', 'Shop Accessories'],
    childCatIds:[10,17,21]
  },
  {
    catId:20,
    title: 'Kids',
    image: '/images/catImg/k1.jpg',
    buttons: ['Shop Shoes', 'Shop Apparel', 'Shop Accessories'],
    childCatIds:[10,17,21]
  },
];

export default async function GenderCategoryList() {

const shopbyGender=await getShopByGender()
// console.log("shop by", shopbyGender)

  return (
  <div className='py-10'>
    <div className="mb-6 border-b-2 border-[#3A9E75]">
        <h1 className="font-semibold text-xl sm:text-2xl mb-2 space-grotesk ">Shop by</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {shopbyGender?.map((item, idx) => (
        <GenderCategoryCard
          key={idx}
         
          item={item}
        />
      ))}
    </div>
  </div>
  );
}
