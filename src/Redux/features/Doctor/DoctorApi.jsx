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
    doctorfirstTimeChangePwd: builder.mutation({
      query: (Password) => ({
        url: "doctor/firtspasswordchange",
        method: "POST",
        body: Password,
      }),
    }),
  }),
});

export const {
  useDoctorLoginMutation,
  useDoctorLogoutMutation,
  useDoctorfirstTimeChangePwdMutation,
} = DoctorApi;
