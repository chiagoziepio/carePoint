import { createSlice } from "@reduxjs/toolkit";

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
};

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {},
});

export default AdminSlice.reducer;
