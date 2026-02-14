"use client"

import { useState, useEffect } from "react"
import Container from "@/components/shared/Container"
import axiosInstance from "@/utils/axiosInstance"
import ProductCardShopPage from "./ProductCardShopPage"
import ProductListSkeleton from "../Skeletons/ProductListSkeleton"
import Pagination from "../shared/Pagination"




export default function ShopByCategories({slug}) {
  
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const per_page = 2; 



  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data } = await axiosInstance.get(`/categories/${slug}/with/products?&page=${currentPage}&per_page=${per_page}`);
    
      setProducts(data?.products?.data);
      const totalPages = data?.products?.last_page
      setTotalPages(totalPages)
      setLoading(false)
    };

    fetchProducts();
  }, [currentPage]);




  // console.log("slug",slug)

  let productListSection;
  if (loading) {

    productListSection = <ProductListSkeleton />

  }
  else {
    productListSection = products?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.map((product, i) => (
          <ProductCardShopPage product={product} key={i}
          />

        ))}
      </div>
    ) : (
      <div className="text-center text-gray-600 text-lg py-10">No products found .</div>
    )
  }


  return (
    <Container className="py-8">

      {productListSection}
    
      <div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  )
}
