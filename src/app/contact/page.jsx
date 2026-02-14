import ContactPage from '@/components/Contacts/ContactPage'
import { getOutlets } from '@/utils/actions'
import React from 'react'

export default async function page() {
  const outlets=await getOutlets()
//  console.log("outlets in contact page",outlets)
  return (
    <div>
   <ContactPage outlets={outlets?.data}/>
      
    </div>
  )
}
