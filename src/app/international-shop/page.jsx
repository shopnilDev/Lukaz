import ShopPage from '@/components/Shop/Shop'
import ShopInternational from '@/components/Shop/ShopInternational'
import { getBrands, getCategories } from '@/utils/actions'
import React from 'react'

export default async function page() {
const brands=await getBrands()
const categories=await getCategories()

  return (
    <div>
    <ShopInternational brands={brands} categories={categories} />

    </div>
  )
}
