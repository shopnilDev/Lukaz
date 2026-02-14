import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function AccountDetails({  addresses }) {
  const { state } = useContext(UserContext);
  const user = state?.user;

//   console.log("user info", user)
  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>

      {/* Profile Information */}
      <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Information</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user?.phone}
          </p>
        </div>
        {/* <button className="mt-6 px-4 py-2 bg-[#3A9E75] text-white rounded-md  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Edit Profile
        </button> */}
      </div>

      {/* Shipping Addresses */}
      {/* <div className="bg-white ">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Shipping Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-gray-600">You have no saved addresses.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-1">{address.name}</h4>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-sm text-gray-600">{address.country}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="mt-6 px-4 py-2 bg-[#3A9E75] text-white rounded-md  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Add New Address
        </button>
      </div> */}
    </div>
  )
}