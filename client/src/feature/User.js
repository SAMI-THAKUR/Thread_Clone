import { createSlice } from "@reduxjs/toolkit";
const local = JSON.parse(localStorage.getItem("user-threads")) || null;
const initialState = {
  user: local != null ? local.value : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
