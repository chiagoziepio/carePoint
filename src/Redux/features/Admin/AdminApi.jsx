import { AppApi } from "../../Api/AppApi";

export const AdminApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation({
      query: (formData) => ({
        url: "admin/create-doctor",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateDoctorMutation } = AdminApi;
