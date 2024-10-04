import { AppApi } from "../../Api/AppApi";

export const patientApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (values) => ({
        url: "patient/register",
        method: "POST",
        body: values,
      }),
    }),
    patientLogin: builder.mutation({
      query: (values) => ({
        url: "patient/login",
        method: "POST",
        body: values,
      }),
    }),
    patientLogout: builder.mutation({
      query: () => ({
        url: "patient/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  usePatientLoginMutation,
  usePatientLogoutMutation,
} = patientApi;
