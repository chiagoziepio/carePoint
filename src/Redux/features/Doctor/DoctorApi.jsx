import { AppApi } from "../../Api/AppApi";

export const DoctorApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    doctorLogin: builder.mutation({
      query: (values) => ({
        url: "doctor/login",
        method: "POST",
        body: values,
      }),
    }),
    doctorLogout: builder.mutation({
      query: (_id) => ({
        url: "doctor/logout",
        method: "POST",
        body: _id,
      }),
    }),
  }),
});

export const { useDoctorLoginMutation, useDoctorLogoutMutation } = DoctorApi;
