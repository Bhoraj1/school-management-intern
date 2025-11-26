import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
      state.isAuth = !!action.payload; // !! is used for change boolean
    },
    logout: (state) => {
      state.email = "";
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
