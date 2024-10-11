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
    getAllDoctors: builder.query({
      query: () => "admin/alldoctors",
    }),
  }),
});

export const { useCreateDoctorMutation, useGetAllDoctorsQuery } = AdminApi;
