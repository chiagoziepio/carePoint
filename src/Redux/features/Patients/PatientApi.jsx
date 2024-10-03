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
  }),
});

export const { useUserSignupMutation } = patientApi;
