import React from 'react'
import TopBannerSlider from './TopBannerSlider'
import { getBanners } from '@/utils/actions'

export default async function TopBanner() {

const banners= await getBanners()


  return (
    <div>
      <TopBannerSlider banners={banners}/>
    </div>
  )
}
