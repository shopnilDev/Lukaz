import ShopPage from '@/components/Shop/Shop'
import { getBrands, getCategories } from '@/utils/actions'
import React from 'react'

export default async function page() {
const brands=await getBrands()
const categories=await getCategories()

  return (
    <div>
    <ShopPage brands={brands} categories={categories} />

    </div>
  )
}
