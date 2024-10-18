import { createSlice } from "@reduxjs/toolkit";
import { patientApi } from "./PatientApi";
import Cookies from "js-cookie";
const initialState = {
  patient: null,
  loading: false,
  isDrawerOpen: false,
  token: null,
  notification: [],
};

const date = new Date();
date.setTime(date.getTime() + 3 * 60 * 60 * 1000);

const PatientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = state.isDrawerOpen ? false : true;
    },
    tokenChecker: (state) => {
      state.patient = null;
    },
    updatePatientNotiffication: (state, action) => {
      state.notification = action.payload;
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
    builder.addMatcher(
      patientApi.endpoints.patientLogin.matchFulfilled,
      (state, action) => {
        state.patient = action.payload.user;
        (state.token = action.payload.token),
          (state.notification = action.payload.user.notifications);
        Cookies.set("token", JSON.stringify(state.token), { expires: date });
      }
    );
    builder.addMatcher(
      patientApi.endpoints.patientLogout.matchFulfilled,
      (state, action) => {
        (state.patient = action.payload.patient),
          (state.token = action.payload.token);
        Cookies.set("token", JSON.stringify(state.token));
      }
    );
    builder.addMatcher(
      patientApi.endpoints.BookAppointment.matchFulfilled,
      (state, action) => {
        state.patient = action.payload.user;
        state.notification = action.payload.user.notifications;
      }
    );
    builder.addMatcher(
      patientApi.endpoints.updatePatientDetails.matchFulfilled,
      (state, action) => {
        state.patient = action.payload.user;
        (state.token = action.payload.token),
          (state.notification = action.payload.user.notifications);
        Cookies.set("token", JSON.stringify(state.token), { expires: date });
      }
    );
    builder.addMatcher(
      patientApi.endpoints.updatePatientPic.matchFulfilled,
      (state, action) => {
        state.patient = action.payload.user;
      }
    );
    builder.addMatcher(
      patientApi.endpoints.clearNotification.matchFulfilled,
      (state, action) => {
        state.notification = action.payload.notifications;
      }
    );
  },
});

export const { toggleDrawer, tokenChecker, updatePatientNotiffication } =
  PatientSlice.actions;

export default PatientSlice.reducer;
