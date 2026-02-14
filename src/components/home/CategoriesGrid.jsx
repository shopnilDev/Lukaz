"use client"
import { useFilter } from '@/context/FilterContext';
import { getCategories } from '@/utils/actions';
import { getImageUrl } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';



const CategoriesGrid = ({ categories }) => {

  const { dispatch: dispatchFilterProduct } = useFilter();


  const handleFilter = (cat) => {
    
    // dispatchFilterProduct({ type: "SET_CATEGORIES", payload: cat });
  }


  return (
    <section className="py-10 bg-gradient-to-r from-[#8ae5bf] via-[#68bf9b] to-[#70bf9c]">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white space-grotesk">Shop by Category</h2>
        <p className="text-white mt-1 text-sm md:text-base space-grotesk">Find your perfect pair by category</p>
      </div>

      <div className="mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16 grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {categories.slice(0, 15).map((category, idx) => (


          <div
          key={idx}
            className="bg-white group h-[300px] md:h-[350px] lg:h-[380px] xl:h-[410px] rounded-md bg-cover bg-center relative overflow-hidden cursor-pointer">
            <Link
              onClick={() => handleFilter(category?.id)}
              href={`/shop/${category?.slug}`}
              className="absolute inset-0 bg-center bg-cover transition-transform duration-700 scale-100 group-hover:scale-105"
              style={{ backgroundImage: `url(${getImageUrl("category", category?.thumbnail)})` }}
            ></Link>
            {/* dark overlay */}
            <Link
              onClick={() => handleFilter(category?.id)}
              href={`/shop/${category?.slug}`}
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">

            </Link>

            <Link
              onClick={() => handleFilter(category?.id)}
              href={`/shop/${category?.slug}`}
              className="absolute text-center bottom-7 left-4 right-4 text-white text-xl font-bold space-grotesk">
              {category?.name.toUpperCase()}
            </Link>
          </div>

        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
