import { useDashboard } from "@/context/DashboardContext"



export function DashboardContent() {
  const { activeSection, setActiveSection } = useDashboard()

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview orders={dummyOrders} />
      case "orders":
        return <OrderList orders={dummyOrders} title="Order List" />
      case "trackOrder":
        return <TrackOrderForm />
      case "account":
        return <AccountDetails user={dummyUser} addresses={dummyAddresses} />
      case "wishlist":
        return <Wishlist />
      case "settings":
        return <SettingsPage />
      default:
        return <Overview orders={dummyOrders} />
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
        <div className="w-full lg:w-4/5 bg-white">{renderContent()}</div>
      </div>
    </Container>
  )
}
