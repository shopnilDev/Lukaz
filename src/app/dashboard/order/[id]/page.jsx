"use client"

import OrderDetailsPage from '@/components/Dashboard/OrderDetailsPage'
import { getSingleOrder } from '@/utils/actions'
import axiosInstance from '@/utils/axiosInstance';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default  function page() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/order/${id}`);
    
        setOrderDetails(data); 
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

  }, [id]);



//  console.log(orderDetails)

  return (
    <div className=''>
        <OrderDetailsPage orderDetails={orderDetails}/>
    </div>
  )
}
