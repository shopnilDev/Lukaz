"use client";

import React, { createContext, useReducer, useContext } from "react";

const SearchContext = createContext();

const initialState = {
  brand: "",
  sort_by_price: "", // "asc" or "desc"
  color: "",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_BRAND":
      return { ...state, brand: action.payload };

    case "SET_SORT_BY_PRICE":
      return { ...state, sort_by_price: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "RESET_FILTERS":
      return initialState;

    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easy usage
export const useSearch = () => {
  return useContext(SearchContext);
};
