"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  // get initial section from localStorage if exists
  const getInitialSection = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboardActiveSection")
      return saved || "overview"
    }
    return "overview"
  }

  const [activeSection, setActiveSection] = useState(getInitialSection)

  // whenever activeSection changes, update localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardActiveSection", activeSection)
    }
  }, [activeSection])

  return (
    <DashboardContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </DashboardContext.Provider>
  )
}

// custom hook for easy access
export function useDashboard() {
  return useContext(DashboardContext)
}
