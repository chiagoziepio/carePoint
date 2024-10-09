import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    trackUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default AppSlice.reducer;

export const { trackUser } = AppSlice.actions;
