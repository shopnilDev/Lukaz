// "use client"

// import { useState, useEffect, useRef, useContext } from "react"
// import Image from "next/image"
// import Container from "@/components/shared/Container"
// import { ChevronDown, Minus, Plus } from "lucide-react"
// import CustomSelectInput from "@/components/shared/CustomSelectInput"
// import Link from "next/link"
// import toast from "react-hot-toast"
// import axiosInstance from "@/utils/axiosInstance"
// import { CartContext } from "@/context/CartContext"
// import { getImageUrl, transformCartItem } from "@/utils/helpers"
// import { UserContext } from "@/context/UserContext"
// import { useRouter } from "next/navigation"
// import { findByName, findDistrictName } from "@/utils/findDistrictName"


// export default function CartCheckoutPage() {
//   const router = useRouter()
//   const { state } = useContext(CartContext);
//   const { state:userState,dispatch:dispatchUserContext } = useContext(UserContext);
//   const user=userState?.user
//   const contextCartItems = state?.items;
//   const [cartItems, setCartItems] = useState([]);
// // Shipping Information State
//   const [cuponCode, setCuponCode] = useState(null)
//   const [fullName, setFullName] = useState("")
//   const [thana, setThana] = useState("")
//   const [distList, setDistList] = useState([])
//   const [distID, setDistID] = useState()
//   const [note, setNote] = useState("")
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [address, setAddress] = useState("")
//   const [selectedDistrict, setSelectedDistrict] = useState("")
//   const [shippingCharge, setShippingCharge] = useState(0)
//   const [discountAmount, setDiscountAmount]=useState(0)

//   // State to manage which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null)
//   // Payment Method State
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod")



//   // change structure cart context data and save to cartItems state
//   useEffect(() => {
//     if (contextCartItems && contextCartItems.length > 0) {
//       const transformed = contextCartItems.map(transformCartItem);
//       setCartItems(transformed);
//     }
//   }, [contextCartItems]);


//   // fetch districts data
//   useEffect(() => {
//     const fetchDistricts = async () => {
//     const {data} = await axiosInstance.get(`/countries/18/districts`);  
//     setDistList(data)
//     };
//     fetchDistricts();   
//   }, []);


//   // Ref  outside any dropdown
//   const documentRef = useRef(typeof document !== "undefined" ? document : null)

//   // Handle quantity change for cart items
//   const handleQuantityChange = (id, delta) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
//     )
//   }

//   // Handle color change for cart items
//   const handleColorChange = (itemId, newColor,item) => {
//     const new_Slug=`${item?.item_id}_${newColor.toLowerCase()}_${item?.SelectedSize}`
//     const preOrder=isPreOrderRequired(item,new_Slug)
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === itemId ? { ...item, SelectedColor: newColor,preOrder:preOrder } : item)),
//     )
  


//     setOpenDropdown(null) // Close dropdown after selection
//   }


//   // Handle size change for cart items
//   const handleSizeChange = (itemId, newSize,item) => {
//     const new_Slug=`${item?.item_id}_${item?.SelectedColor?.toLowerCase()}_${newSize}`
//      const preOrder=isPreOrderRequired(item,new_Slug)
//     // console.log("preOrder type",{preOrder,new_Slug})

   
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === itemId ? { ...item, SelectedSize: newSize,preOrder:preOrder } : item)),
//     )
 
 

//     setOpenDropdown(null) // Close dropdown after selection
//   }

// // console.log("cart",cartItems)
// // console.log("preOrder type",preOrder)

// const isPreOrderRequired = (item,new_Slug) => {
//   // console.log("selected item, slug",item)
//    const selectedtem=item?.additionals.find((additional)=>additional?.additional_key==new_Slug)|| {}

//    if(item?.is_pre_order==1 && selectedtem?.stocks_sum_stock==0){
//     // console.log("stock",selectedtem?.stocks_sum_stock)
//     return true ;
//    }
//     return false ;
// }

//   // Toggle dropdown visibility
//   const toggleDropdown = (itemId, type) => {
//     if (openDropdown && openDropdown.itemId === itemId && openDropdown.type === type) {
//       setOpenDropdown(null) // Close if already open
//     } else {
//       setOpenDropdown({ itemId, type }) // Open specific dropdown
//     }
//   }
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       // Check if the click target is a dropdown button or inside a dropdown list
//       const isClickOnDropdownButton = event.target.closest(".custom-dropdown-button")
//       const isClickInsideDropdownList = event.target.closest(".custom-dropdown-list")

//       // If a dropdown is open and the click is not on a button or inside a list, close it.
//       if (openDropdown && !isClickOnDropdownButton && !isClickInsideDropdownList) {
//         setOpenDropdown(null)
//       }
//     }

//     if (documentRef.current) {
//       documentRef.current.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       if (documentRef.current) {
//         documentRef.current.removeEventListener("mousedown", handleClickOutside)
//       }
//     }
//   }, [openDropdown]) // Re-run effect if openDropdown state changes


//      const handleDistrict=(value)=>{
//       const selectedDist=findByName(distList,value)
//       setShippingCharge(selectedDist?.courier_charge)
//       setDistID(selectedDist?.id)
//       setSelectedDistrict(value)

//       }

//   // Calculate Subtotal of Cart Items
//   const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   // Calculate Grand Total
//   const grandTotal = cartSubtotal + shippingCharge-discountAmount


//   const isFormValid =
//     fullName.trim() !== "" &&
//     phoneNumber.trim() !== "" &&
//     address.trim() !== "" &&
//     selectedDistrict !== "" &&
//     selectedPaymentMethod !== ""


//  const applyPromoCode=async()=>{
//   try {
//     const {data} = await axiosInstance.post("/get-discount",{
//     promo_code:cuponCode
//   } );
//   // console.log("promo code res",data)
//   setDiscountAmount(data?.discount)
//   } catch (error) {
//      console.log("faild to get discount by promo code",error)
//   }
//  }

// const handlePlaceOrder = async () => {

// if(isFormValid){
//     const orderData = {
//     shipping_cost: shippingCharge,
//     promo_code: cuponCode || null,
//     description: "",
//     payment_method: selectedPaymentMethod,
//     // promoDiscount:discountAmount,
//     order_type:0,
//     items: cartItems.map((item) => ({
//         brand_id: item?.brand_id,
//         // preOrder:item?.preOrder,
//         item_id: item?.item_id,
//         item_name: item?.name,
//         icon:item?.image,
//         slug: item?.slug,
//         color: item?.SelectedColor,
//         size: item?.SelectedSize,
//         regular_price: item?.regular_price ,
//         current_price: item?.current_price ,
//         discount_amount: item?.discount,
//         quantity:item?.quantity,
//           })),
  
//     shipping: {
//       district_id: distID,
//       thana: thana,
//       full_name: fullName,
//       phone: phoneNumber,
//       address: address,
//       note: note,
//     },
//   };


//   try {
    
//     console.log("Placing order...",orderData);

//     const response = await axiosInstance.post("/orders/place", orderData);
    
//     if(!user?.name){
//     if(response?.data?.token){
//                 const user = {
//                   name:response?.data?.user?.name,
//                   email:response?.data?.user?.email || "No Email Added",
//                   phone:response?.data?.user?.mobile,
//                 };
//                 const token=response?.data?.token;

//                 dispatchUserContext({ type: "LOGIN", payload: { user, token: token } });
            
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("user", JSON.stringify(user));
//           }
//     }

     
//       // console.log("order place response",response)

//       if(response?.data?.order_no){
//         toast.success(`Your order has been placed successfully!`);
//         router.push(`/order-success?order_id=${response?.data?.order_no}`)
//       } else if (response?.data?.payment_url) {
//         window.location.href = response?.data?.payment_url;
//       } else {
//         console.error("Order failed:", response.data);
//       }

    
//   } catch (error) {
//     console.error("Error placing order:", error);
//     toast.error("Something went wrong while placing the order.");
//   }
// }else{
// alert("Please fill in all required shipping details and select a payment method.")
// }
// };

//   return (
//     <div className="min-h-screen bg-[#ECF5F1]">
//       <Container className=" py-5">
//         <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-4">
//           {/* Left Column: Shipping Details */}
//           <div className="md:w-[40%] lg:w-[50%]  sm:bg-white p-1 sm:py-4
//            sm:px-5 sm:rounded-lg sm:shadow-sm">
//             <h2 className="text-xl font-semibold mb-2 text-gray-700">Shipping Information</h2>
//             <div className="space-y-3">
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   className="mt-1 block w-full bg-white px-3 py-1.5 sm:py-2 border
//                    border-gray-300 rounded-sm shadow-sm placeholder-gray-400
//                     focus:outline-none
//                    focus:ring-1 focus:ring-[#3A9E75] focus:border-[#3A9E75]
//                     sm:text-sm"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium
//                  text-gray-700 mb-1">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   className="mt-1 bg-white block w-full px-3 py-1.5 sm:py-2 border
//                    border-gray-300 rounded-sm shadow-sm placeholder-gray-400 
//                    focus:outline-none focus:ring-1
//                    focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                 />
//               </div>

//               <CustomSelectInput label="District" options={findDistrictName(distList)} selectedItem={selectedDistrict}
//                handleFunction={handleDistrict}/>
//                {/* {
//                 thanaList?.length>0 ?
//                 <CustomSelectInput label="Thana" options={thanaList} selectedItem={thana}
//                handleFunction={handleThana}/>
//                :
//                ""
//                } */}
               

//                 <div>
//                 <label htmlFor="thana" className="block text-sm font-medium
//                  text-gray-700 mb-1">
//                   Thana <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="thana"
//                   className="bg-white mt-1 block w-full px-3 py-1.5 sm:py-2 border
//                    border-gray-300 rounded-sm
//                    shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1
//                    focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
//                   value={thana}
//                   onChange={(e) => setThana(e.target.value)}
//                   required
//                 />
//               </div>
             

//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium
//                  text-gray-700 mb-1">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="address"
//                   rows="2"
//                   className="bg-white mt-1 block w-full px-3 py-1.5 sm:py-2 border
//                    border-gray-300 rounded-sm placeholder-gray-400 
//                    focus:outline-none focus:ring-1 focus:ring-[#3A9E75]
//                     focus:border-[#3A9E75] sm:text-sm"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
            
//              <div>
//                 <label htmlFor="thana" className="block text-sm font-medium text-gray-700 mb-1">
//                   Note 
//                 </label>
//                 <input
//                   type="text"
//                   id="note"
//                   className="bg-white mt-1 block w-full px-3 py-1.5 sm:py-2 border
//                    border-gray-300 rounded-sm
//                    shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1
//                    focus:ring-[#3A9E75] focus:border-[#3A9E75] sm:text-sm"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
                  
//                 />
//               </div>

//             </div>
//           </div>
//           {/* Right Column: Cart Summary */}
//           <div className="md:w-[60%] lg:w-[50%] sm:bg-white p-1 sm:py-4 sm:px-5 
//           sm:rounded-lg sm:shadow-sm">
//             <h2 className="text-xl font-semibold mb-2 text-gray-700">Items</h2>
           
//             {/*  items */}
//              <div className="mb-2 ">
//               {cartItems?.map((item,i) => (
//                 <div key={i}
//                 className=" mb-7 sm:mb-3   "
//                 >
                  
//                   <div className="flex items-center gap-2.5 sm:gap-3 ">
//                     {/* image section */}
//                  <div className="h-full  ">
//                        <Image
//                       src={getImageUrl("products",item?.image)}
//                       alt={item.name}
//                       width={70}
//                       height={70}
//                       className="hidden sm:block rounded-sm h-full object-cover"
//                     />
//                     <Image
//                      src={getImageUrl("products",item?.image)}
//                       alt={item.name}
//                       width={95}
//                       height={50}
//                       className="sm:hidden rounded-sm h-full object-cover"
//                     />
//                  </div>
//                  {/* item content */}
//                     <div className="w-full flex flex-col justify-center ">
//                       <div className="flex   justify-between">

//                         <div className=" gap-1 flex flex-col   ">
//                           <Link
//                           href={`/product/${item?.id}`}
//                           className="hidden sm:block text-[16px] font-semibold text-gray-800 
//                            leading-5 mr-2">{item.name.slice(0,54)}</Link>
//                            <Link
//                            href={`/product/${item?.id}`}
//                            className="sm:hidden text-[14px]  font-semibold
//                             text-gray-800  leading-5 ">{item.name.slice(0,25)}</Link>
                       
//                         <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row
//                          justify-between gap-1.5 sm:gap-2 leading-5   ">
//                           {/* Color Dropdown */}
//                           <div className="relative ">
//                             <button
//                               onClick={() => toggleDropdown(item.id, "color")}
//                               className="text-sm sm:text-[15px] leading-5 text-gray-600  hover:text-gray-800 
//                               cursor-pointer
//                                focus:outline-none custom-dropdown-button"
//                             >
//                           <span className="flex justify-center items-center">
//                             Colour: <span className="h-6 ml-1 flex justify-center
//                              items-center bg-white sm:bg-[#ECF5F1] border text-[13px]  px-2 
//                               rounded-sm">{item.SelectedColor} <ChevronDown size='18' /></span></span>
//                             </button>
//                             {openDropdown && openDropdown.itemId === item.id && openDropdown.type === "color" && (
//                               <ul className="absolute z-10 bg-white border border-[#3A9E75] 
//                               rounded-xs shadow-lg mt-1.5  w-32 custom-dropdown-list">
//                                 {item.colors.map((color,i) => (
//                                   <li
//                                     key={color}
//                                     onClick={() => handleColorChange(item.id, color,item)}
//                                     className={`px-3 py-2 text-sm text-gray-700 
//                                      hover:bg-[#ECF5F1] cursor-pointer ${i!=0 && "border-t border-t-[#3A9E75]"}`}
//                                   >
//                                     {color}
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </div>

//                           {/* Size Dropdown */}
//                           <div className="relative">
//                             <button
//                               onClick={() => toggleDropdown(item.id, "size")}
//                               className="text-sm sm:text-[15px] leading-5 text-gray-600  hover:text-gray-800
//                                cursor-pointer focus:outline-none custom-dropdown-button"
//                             >
//                                <span className="flex justify-center items-center">
//                                 Size: <span className="h-6  flex justify-center items-center bg-white 
//                                  sm:bg-[#ECF5F1] px-2  rounded-sm border ml-[21px] sm:ml-1 md:ml-[23px]
//                                   lg:ml-1 text-[13px]">{item.SelectedSize} 
//                                  <ChevronDown size='18' /></span></span>
                             
//                             </button>
//                             {openDropdown && openDropdown.itemId === item.id && openDropdown.type === "size" && (
//                               <ul className="absolute z-10 bg-white border border-[#3A9E75]  
//                               rounded-xs shadow-lg mt-1.5   w-32 custom-dropdown-list">
//                                 {item.sizes.map((sizeOption,i) => (
//                                   <li
//                                     key={i}
//                                     onClick={() =>  handleSizeChange(item?.id, sizeOption,item)}
//                                     className={` px-3 py-2 text-sm text-gray-700 ${i!=0 && " border-t border-t-[#3A9E75] not-last:hover:bg-[#ECF5F1]  cursor-pointer"} 
//                                    `}
//                                   >
//                                     {sizeOption} 
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </div>
//                         </div>
//                         </div>


//                         <div className="flex flex-col gap-1 
//                          items-center  ">
//                           {/* quantity */}
//                           <div className="cursor-pointer mt-1 flex ">
//                             <button
//                               onClick={() => handleQuantityChange(item.id, -1)}
//                               className="text-md px-2  py-1.5  border border-gray-300 rounded-l-md
//                                bg-white sm:bg-[#ECF5F1] hover:bg-gray-200 text-gray-700"
//                             >
//                              <Minus size="18" />
//                             </button>
//                           <div className="w-7 bg-white  sm:w-8 flex
//                            justify-center items-center border-t border-b
//                            border-gray-300 ">
//                               <span className="text-md     text-gray-800">
//                               {item.quantity}
//                             </span>
//                           </div>
//                             <button
//                               onClick={() => handleQuantityChange(item.id, 1)}
//                               className="text-md px-2 py-1.5 border
//                                border-gray-300 rounded-r-md bg-white sm:bg-[#ECF5F1] hover:bg-gray-200
//                                 text-gray-700"
//                             >
//                              <Plus size="18" />
//                             </button>
//                           </div>
//                           {/* sub Total */}
//                           <div className="">
//                             <span className="text-sm font-semibold text-[#3A9E75]">
//                               {(item.price * item.quantity).toFixed(2)}৳
//                             </span>
//                           </div>
//                         </div>
//                       </div>

                      
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {/* each item end */}
//             </div>

//             {/* Cart Summary Totals */}
//             <div className="border-t border-gray-200 pt-2 space-y-1">
//               <div className="flex text-sm justify-between text-gray-700">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">{cartSubtotal.toFixed(2)}৳</span>
//               </div>
//               <div className="flex text-sm  justify-between text-gray-700">
//                 <span>Shipping Charge:</span>
//                 <span className="font-semibold">{shippingCharge.toFixed(2)}৳</span>
//               </div>
//                 <div className="flex text-sm  justify-between text-gray-700">
//                 <span>Discount:</span>
//                 <span className="font-semibold">{discountAmount}৳</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-1 mt-1">
//                 <span>Total:</span>
//                 <span>{grandTotal.toFixed(2)}৳</span>
//               </div>
//             </div>
//              {/* Promo Code Section */}
//             <div className="mt-2 sm:mt-0 py-1.5 w-full">
//               {/* <h3 className="font-semibold text-lg mb-2 text-[#3A9E75]">Have A Coupon Code?</h3> */}
//               <div className="flex ">
//                 <input
//                   type="text"
//                   placeholder="Coupon Code"
//                   className="border bg-white border-[#3A9E75] focus:outline-none 
//                    focus:ring-[#3A9E75] focus:border-[#3A9E75]
//                    px-3 flex-grow rounded-md rounded-l-md rounded-r-none text-sm "
//                   value={cuponCode}
//                   onChange={(e) => setCuponCode(e.target.value)}
//                 />
//                 <button
//                   className="bg-[#3A9E75] focus:border-[#3A9E75] text-white px-4 py-1.5
//                    rounded-md rounded-l-none 
//                   rounded-r-md"
//                   onClick={applyPromoCode}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//             {/* Payment Method Section */}
//             <div className="mt-1.5 ">
//              <div>
//              </div>
//               <div className="space-y-1">
//                 <div className="flex justify-between">

//                   <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="sslcommerz "
//                     name="paymentMethod"
//                     value="sslcommerz"
//                     checked={selectedPaymentMethod === "sslcommerz"}
//                     onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//                     className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//                   />
//                   <label htmlFor="cod" className="ml-3 block text-base font-medium text-gray-700">
//                    Online Pay
//                   </label>
//                 </div>

//                  <div className=" flex flex-wrap gap-3  justify-between items-center ">
                   
//                 <Image
//                 src="/images/payments/Bkash.png"
//                 alt="Bkash"
//                 width={45}
//                 height={30}
//                 />
              
//                    <Image
//                 src="/images/payments/Nagad.png"
//                  alt="nagad"
//                width={45}
//                 height={30}
//                 className=""
//                 />
//                  <Image
//                 src="/images/payments/Visa.png"
//                  alt="visa"
//                width={35}
//                 height={30}
//                 className=""
//                 />
//                   <Image
//                 src="/images/payments/Mastercard.png"
//                  alt="mastercard"
//                width={35}
//                 height={30}
//                 className=""
//                 />
//                </div>
//                 </div>
           
//                 <div className="flex items-center -mt-1.5">
//                   <input
//                     type="radio"
//                     id="bkash "
//                     name="paymentMethod"
//                     value="bkash "
//                     checked={selectedPaymentMethod === "bkash "}
//                     onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//                     className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//                   />
//                   <label htmlFor="bkash" className="ml-3 block text-base font-medium text-gray-700">
//                     Bkash
//                   </label>
//                 </div>
//                      <div className="flex items-center ">
//                   <input
//                     type="radio"
//                     id="cod"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={selectedPaymentMethod === "cod"}
//                     onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//                     className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//                   />
//                   <label htmlFor="cod" className="ml-3 block text-base font-medium text-gray-700">
//                     Cash on Delivery
//                   </label>
//                 </div>
                
//               </div>
//             </div>
             


//             {/* Place Order Button */}
//             <div className="mt-2 text-center">
//                <button
//                 onClick={handlePlaceOrder}
                
//                 className={`w-full px-5 py-2 text-md font-semibold rounded-md shadow-md 
//                   transition-colors duration-200 bg-[#3A9E75] text-white
//                    hover:bg-[#2f5143] focus:outline-none focus:ring-2 `}
//               >
//                 Place Order
//               </button>
//               {/* <button
//                 onClick={handlePlaceOrder}
//                 disabled={!isFormValid}
//                 className={`w-full px-5 py-2 text-md font-semibold rounded-md shadow-md transition-colors duration-200 ${
//                   isFormValid
//                     ? "bg-[#3A9E75] text-white hover:bg-[#2f5143] focus:outline-none focus:ring-2 "
//                     : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 Place Order
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   )
// }
