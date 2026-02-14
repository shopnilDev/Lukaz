"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";


export default function PrivateRoute({ children }) {
const { state,dispatch } = useContext(UserContext);
const user = state?.user;  
const router = useRouter();

 

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user?.name) {
      router.replace("/login");
    }
  }, [user, router]);

  // Prevent rendering protected page while checking auth
  if (!user?.name) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-lg">You have login before visit dashboard. Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
