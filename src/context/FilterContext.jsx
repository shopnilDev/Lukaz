"use client";

import React, { createContext, useContext, useReducer } from "react";

// ----------------------
// Initial State
// ----------------------
const initialState = {
  brand: "",
  category:"",
  priceRange: "",
  sort: "low_to_high",
  search: "",
  color:""
};

// ----------------------
// Reducer
// ----------------------
function filterReducer(state, action) {
  switch (action.type) {
    case "SET_BRANDS":
      return { ...state, brand: action.payload };

    case "SET_CATEGORIES":
      return { ...state, category: action.payload };

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "SET_SORT":
      return { ...state, sort: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload };
      
    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "RESET_FILTERS":
      return initialState;

    default:
      return state;
  }
}

// ----------------------
// Context Creation
// ----------------------
const FilterContext = createContext();

// ----------------------
// Provider Component
// ----------------------
export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

// ----------------------
// Custom Hook
// ----------------------
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
