"use client";

import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();
// Initial state
const initialState = {
  user: {}, 
  token: null, 
};

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token || null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // e.g., { name: 'New Name' }
        },
      };

    default:
      console.warn(`Unhandled action: ${action.type}`);
      return state;
  }
}

// Provider
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // 🔁 Rehydrate context on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: JSON.parse(storedUser),
          token: storedToken,
        },
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
