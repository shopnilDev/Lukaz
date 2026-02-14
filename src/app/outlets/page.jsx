import Outlets from '@/components/Outlets/Outlets'
import { getOutlets } from '@/utils/actions'
import React from 'react'

export default async function page() {

const outlets= await getOutlets()

  return (
    <div>
   <Outlets outlets={outlets?.data}/>

    </div>
  )
}
