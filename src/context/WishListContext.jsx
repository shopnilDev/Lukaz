"use client";

import { createContext, useEffect, useReducer } from "react";

export const WishListContext = createContext();

const initialState = {
  items: [],
};

function wishListReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (item) => item?.productData?.slug === action?.payload?.productData?.slug
      );

      if (exists) {
        // Already in wishlist, do nothing
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item?.productData?.slug !== action?.payload
        ),
      };

    case "CLEAR_WISHLIST":
      return initialState;

    default:
      console.warn(`Unhandled action: ${action.type}`);
      return state;
  }
}

export function WishListProvider({ children }) {
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("lukazWishList");
      return storedState ? JSON.parse(storedState) : initialState;
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(wishListReducer, getInitialState());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lukazWishList", JSON.stringify(state));
    }
  }, [state]);

  return (
    <WishListContext.Provider value={{ state, dispatch }}>
      {children}
    </WishListContext.Provider>
  );
}
