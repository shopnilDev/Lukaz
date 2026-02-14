// components/GenderCategoryCard.jsx
"use client"
import { useFilter } from '@/context/FilterContext';
import Link from 'next/link';


export default function GenderCategoryCard({ item }) {
const { dispatch:dispatchFilterProduct } = useFilter();



 const handleCatgoryFilter=(item,selectedChildCatId)=>{

const catIds=`${item?.catId},${selectedChildCatId}`


dispatchFilterProduct({ type: "SET_CATEGORIES", payload: catIds });

 }


  return (
    <div className="relative h-[350px] xs:h-[380px] sm:h-[450px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[490px] w-full overflow-hidden rounded-md group cursor-pointer">
      {/* Zoomable image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
        style={{ backgroundImage: `url(${item?.image})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center  px-6">
      
         

         <div className='px-4 absolute bottom-8 left-4 right-4 text-white  w-full'>
           <h2 className="text-4xl font-bold mb-6 space-grotesk">{item?.title}</h2>
           <div className="  flex flex-wrap gap-3 ">
            <Link
              href={`/shop`}
              onClick={()=>handleCatgoryFilter(item,item?.childCatIds[0])}
              className="w-auto border border-white text-white px-4 
              py-2 rounded hover:bg-white hover:text-black transition"
            >
             {item?.buttons[0]}
            </Link>
            <Link
             href={`/shop`}
              onClick={()=>handleCatgoryFilter(item,item?.childCatIds[1])}
              className="border border-white text-white px-4 py-2 
              rounded hover:bg-white hover:text-black transition"
            >
              {item?.buttons[1]}
            </Link>
            <Link
              href={`/shop`}
              onClick={()=>handleCatgoryFilter(item,item?.childCatIds[2])}
              className="border border-white text-white px-4 py-2
               rounded hover:bg-white hover:text-black transition"
            >
              {item?.buttons[2]}
            </Link>
          
         </div>
        </div>
      </div>
    </div>
  );
}
