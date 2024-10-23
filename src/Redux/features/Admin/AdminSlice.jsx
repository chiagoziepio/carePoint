import { createSlice } from "@reduxjs/toolkit";
import { AdminApi } from "./AdminApi";
const initialState = {
  feesTerms: [
    {
      term: "Dermatology",
      fees: { consulting: 100, treatment: 500 },
    },
    {
      term: "Gastroenterology",
      fees: { consulting: 100, treatment: 700 },
    },
    {
      term: "Gynecology",
      fees: { consulting: 200, treatment: 900 },
    },
    {
      term: "Neurology",
      fees: { consulting: 500, treatment: 1200 },
    },
    {
      term: "Pediatricians",
      fees: { consulting: 100, treatment: 300 },
    },
    {
      term: "General_Physician",
      fees: { consulting: 300, treatment: 1000 },
    },
  ],
  doctors: [],
};

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      AdminApi.endpoints.getAllDoctors.matchFulfilled,
      (state, action) => {
        state.doctors = action.payload.doctors;
      }
    );
    builder.addMatcher(
      AdminApi.endpoints.deactivateDoctor.matchFulfilled,
      (state, action) => {
        state.doctors = action.payload.data;
      }
    );
    builder.addMatcher(
      AdminApi.endpoints.activateDoctor.matchFulfilled,
      (state, action) => {
        state.doctors = action.payload.data;
      }
    );
  },
});

export default AdminSlice.reducer;
