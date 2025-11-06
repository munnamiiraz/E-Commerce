'use client'
import { UserData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserData | null;
  token: string | null;
}

let savedToken: string | null = null;
if (typeof window !== "undefined") {
  savedToken = localStorage.getItem("token");
}

const initialState: AuthState = {
  user: null,
  token: savedToken || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    // loadTokenFromLocalStorage: (state) => {
    //   if(typeof window !== "undefined") {
    //     const storedToken = localStorage.getItem("token");
    //     if (storedToken) {
    //       state.token = storedToken;
    //     }
    //   }
    // }
  },
});

export const { setUser, logout,  } = authSlice.actions;

export default authSlice.reducer;
