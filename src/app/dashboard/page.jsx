"use client"

import { useContext, useEffect, useState } from "react"
import { LayoutDashboard, ShoppingCart, User, Heart, Settings, TextSearch } from "lucide-react"
import Container from "@/components/shared/Container"
import OrderList from "@/components/Dashboard/OrderList"
import TrackOrderForm from "@/components/Dashboard/TrackOrderForm"
import ProductCard from "@/components/shared/ProductCard"
import { WishListContext } from "@/context/WishListContext"
import { DashboardProvider } from "@/context/DashboardContext"
import { useDashboard } from "@/context/DashboardContext"

import { AccountDetails } from "@/components/Dashboard/AccountDetails"
import axiosInstance from "@/utils/axiosInstance"
import { Icon } from "@iconify/react"
import PrivateRoute from "@/layout/PrivateRoute"
import OrdersTable from "@/components/Dashboard/OrderListTable"
import OrderListCard from "@/components/Dashboard/OrderListCard"
import { UserContext } from "@/context/UserContext"
import Link from "next/link"


const dummyAddresses = [
  {
    id: "1",
    name: "Home Address",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "90210",
    country: "USA",
  },
  // {
  //   id: "2",
  //   name: "Work Address",
  //   street: "456 Business Ave",
  //   city: "Metropolis",
  //   state: "NY",
  //   zip: "10001",
  //   country: "USA",
  // },
]



// Sidebar Navigation Component
function SidebarNav({ activeSection, onSelectSection }) {
  const navItems = [
    { id: "overview", name: "Overview", icon: LayoutDashboard },
    { id: "orders", name: "Order History", icon: ShoppingCart },
    { id: "preOrder", name: "Pre Orders", icon: ShoppingCart },
    { id: "trackOrder", name: "Track Order", icon: TextSearch },
    { id: "account", name: "Account Details", icon: User },
    { id: "wishlist", name: "Wishlist", icon: Heart },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  return (
    <nav className="space-y-2 ">

      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onSelectSection(item.id)}
            className={`flex items-center gap-3 w-full px-2 py-2 rounded-sm text-left transition-colors duration-200
            ${activeSection === item.id
                ? "bg-[#ECF5F1] text-gray-900 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        )
      })}
    </nav>
  )
}

// Overview Component
function Overview({ orderData }) {
  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">

        <div
          className={`p-4 rounded-sm shadow-sm text-white bg-gradient-to-r from-[#3A9E75] to-[#56C596]`}
        >
          <h3 className="text-lg font-semibold mb-2">Total Order</h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{orderData?.total_order}</p>
            <Icon icon={"streamline:graph-remix"} width="28" height="28" />
          </div>
        </div>

        <div
          className={`p-4 rounded-sm shadow-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Pre Orders</h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{orderData?.pre_order}</p>
            <Icon icon={"streamline:graph-remix"} width="28" height="28" />
          </div>
        </div>

        <div
          className={`p-4 rounded-sm shadow-sm text-white bg-gradient-to-r from-pink-500 to-rose-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Pending Order</h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{orderData?.total_pending}</p>
            <Icon icon={"streamline:graph-remix"} width="28" height="28" />
          </div>
        </div>

        <div
          className={`p-4 rounded-sm shadow-sm text-white bg-gradient-to-r from-orange-400 to-yellow-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Canceled  Order</h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{orderData?.total_cancel}</p>
            <Icon icon={"solar:graph-new-broken"} width="28" height="28" />
          </div>
        </div>

        <div
          className={`p-4 rounded-sm shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Delivered  Order</h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{orderData?.total_delivered}</p>
            <Icon icon={"streamline:graph-solid"} width="28" height="28" />
          </div>
        </div>
      </div>

      <div>

        <div className="mt-10">
          {/* <OrderList orderList={orderData?.orders?.data.slice(0, 2)} /> */}


          <div className="">
            {orderData?.orders?.data?.length === 0 ? (
              <p className="text-gray-600">No orders found!</p>
            ) : (
              <>
                <div className="hidden md:block">
                  <OrdersTable title="" orderList={orderData?.orders?.data.slice(0, 3)} />
                </div>
                <div className="block md:hidden">
                  <OrderListCard orderList={orderData?.orders?.data.slice(0, 2)} />
                </div>

              </>

            )}
          </div>



        </div>
      </div>

    </div>
  )
}


// Wishlist Component
function Wishlist() {
  const { state, dispatch } = useContext(WishListContext);

  const wishlist = state.items;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
      {wishlist?.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist?.map((item, i) => (
            <ProductCard key={i} product={item?.productData} />

          ))}
        </div>
      )}
    </div>
  )
}

// Settings Component (Placeholder)
function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
        <p className="text-gray-600">Manage your preferences and notifications here.</p>
        {/* Add actual settings options here */}
      </div>
    </div>
  )
}


export function DashboardContent() {
  const { activeSection, setActiveSection } = useDashboard()
  const [orderData, setOrderData] = useState()
  const { state } = useContext(UserContext);

  const [preOrderData, setPreOrderData] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/dashboard?order_type=1`)
        setOrderData(res?.data);
      } catch (err) {
        setError("Failed to load orderList");
        console.log("order data fetch error", err)

      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();

  }, []);


  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview orderData={orderData} />
      case "orders":
        return <OrderList order_type="1" title="Order List" />
      case "preOrder":
        return <OrderList order_type="0" title="Pre Order List" />
      case "trackOrder":
        return <TrackOrderForm />
      case "account":
        return <AccountDetails addresses={dummyAddresses} />
      case "wishlist":
        return <Wishlist />
      case "settings":
        return <SettingsPage />
      default:
        return <Overview orderData={orderData} />
    }
  }

  return (
    <Container className="py-8 min-h-screen">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5 bg-white p-4 sm:p-3 rounded-sm shadow-sm border border-gray-100">
          <SidebarNav activeSection={activeSection} onSelectSection={setActiveSection} />
        </div>

        {/* Main Content */}
        {state?.user?.name ?
          <div className="w-full lg:w-4/5 bg-white">{renderContent()}</div>
          :
          <div className="w-full lg:w-4/5 bg-white min-h-screen ">

            <h2 className="mt-6 text-lg sm:text-xl">You are not login please<Link 
            href="/login"
            className="text-lg sm:text-xl text-[#3A9E75] px-1">
            Login
            </Link>to access dashboard</h2>
          
          </div>
        }

      </div>
    </Container>
  )
}


export default function DashboardPage() {

  return (

 
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
   


  )
}
