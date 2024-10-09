import { DoctorApi } from "./DoctorApi";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  doctor: null,
  loading: false,
  isDrawerOpen: false,
  token: null,
  notification: [],
};

const date = new Date();
date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

const DoctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      DoctorApi.endpoints.doctorLogin.matchFulfilled,
      (state, action) => {
        state.doctor = action.payload.user;
        (state.token = action.payload.token),
          (state.notification = action.payload.user.notifications);
        Cookies.set("token", JSON.stringify(state.token), { expires: date });
      }
    );
    builder.addMatcher(
      DoctorApi.endpoints.doctorLogout.matchFulfilled,
      (state, action) => {
        state.doctor = action.payload.doctor;
        state.token = action.payload.token;
      }
    );
  },
});

export default DoctorSlice.reducer;
