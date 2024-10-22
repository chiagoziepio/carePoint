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
    getAllAppointments: builder.query({
      query: () => "admin/allappointments",
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useGetAllAppointmentsQuery,
} = AdminApi;
