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
date.setTime(date.getTime() + 3 * 60 * 60 * 1000);

const DoctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    updateDocNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
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
        Cookies.set("token", JSON.stringify(state.token));
      }
    );
    builder.addMatcher(
      DoctorApi.endpoints.doctorfirstTimeChangePwd.matchFulfilled,
      (state, action) => {
        state.doctor = action.payload.user;
        state.notification = action.payload.user.notifications;
      }
    );
    builder.addMatcher(
      DoctorApi.endpoints.DocClearNotification.matchFulfilled,
      (state, action) => {
        state.notification = action.payload.notifications;
      }
    );
    builder.addMatcher(
      DoctorApi.endpoints.updateDocDetails.matchFulfilled,
      (state, action) => {
        state.doctor = action.payload.user;
        (state.token = action.payload.token),
          (state.notification = action.payload.user.notifications);
        Cookies.set("token", JSON.stringify(state.token), { expires: date });
      }
    );
    builder.addMatcher(
      DoctorApi.endpoints.updateDoctorPic.matchFulfilled,
      (state, action) => {
        state.doctor = action.payload.user;
      }
    );
  },
});

export const { updateDocNotification } = DoctorSlice.actions;
export default DoctorSlice.reducer;
