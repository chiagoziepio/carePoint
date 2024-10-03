import { createSlice } from "@reduxjs/toolkit";
import { patientApi } from "./PatientApi";

const initialState = {
  patient: null,
  loading: false,
  isDrawerOpen: false,
  token: null,
  notification: [],
};
const PatientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = state.isDrawerOpen ? false : true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      patientApi.endpoints.userSignup.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      patientApi.endpoints.userSignup.matchFulfilled,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const { toggleDrawer } = PatientSlice.actions;

export default PatientSlice.reducer;
