import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const res = await axios.get("https://thread-clone-pi-gules.vercel.app/user/auth", {
    withCredentials: true,
    credentials: "include",
  });
  return res.data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFollowing: (state, action) => {
      state.user.following = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setUser, setFollowing } = userSlice.actions;

export default userSlice.reducer;
