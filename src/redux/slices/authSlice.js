import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
