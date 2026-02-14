"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { state } = useContext(UserContext);
  const [user, setUser] = useState(undefined);


  // console.log("user pre", user)




  useEffect(() => {










  }, [ state]);

  // Show loader while checking auth
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  // If user is logged in, render the protected page
  return <>{children}</>;
}
