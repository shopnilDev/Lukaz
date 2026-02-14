import React, { useEffect, useState } from 'react'
import OrderListCard from './OrderListCard'
import OrdersTable from './OrderListTable'
import axiosInstance from '@/utils/axiosInstance'
import Pagination from '../shared/Pagination';

export default function OrderList({order_type,title}) {
  const [orderData,setOrderData]=useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const per_page = 10; // items per page 

 useEffect(() => {
  const fetchOrderList = async () => {
      try {
        setLoading(true);
        const url=`/dashboard?order_type=${order_type}&page=${currentPage}&per_page=${per_page}`
        console.log("order list api",url)
        const res=await axiosInstance.get(url)    
        setOrderData(res?.data); 

      const totalPages= Math.ceil((res?.data?.total_order-res?.data?.pre_order)/per_page)
      setTotalPages(totalPages)

      // console.log("total pages",totalPages)


      } catch (err) {
        setError("Failed to load orderList");
        console.log("order data fetch error", err)

      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();
    
  }, [currentPage,order_type]);


// console.log("order list from order list com", {order_type,orderData})
  

 

  return (
      <div className="">
         {orderData?.orders?.data?.length === 0 ? (
           <p className="text-gray-600">No orders found!</p>
         ) : (
           <>
         <div className="hidden md:block">
             <OrdersTable title={title} orderList={orderData?.orders?.data}/>
         </div>
          <div  className="block md:hidden">
             <OrderListCard orderList={orderData?.orders?.data}/>
         </div>
           
           </>
         
         )}
                <Pagination
                 currentPage={currentPage}
                 totalPages={totalPages}
                 onPageChange={setCurrentPage}
               />
       </div>
  )
}
