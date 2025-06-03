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
  },
});

export const {setUser} = userProfileSlice.actions;
export default userProfileSlice.reducer;
