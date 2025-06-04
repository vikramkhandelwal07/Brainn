import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    }
  },
});

export const { setUser, setLoading } = userProfileSlice.actions;
export default userProfileSlice.reducer;
