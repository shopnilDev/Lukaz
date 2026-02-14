import React from 'react'
import BannerSlider from './BannerSlider'
import { getBanners } from '@/utils/actions'

export default async function Banner() {
const banners= await getBanners()

  return (
    <div>
      <BannerSlider banners={banners}/>
    </div>
  )
}
