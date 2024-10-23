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
    getAllPatients: builder.query({
      query: () => "admin/allpatients",
    }),
    adminCancelAppointment: builder.mutation({
      query: (_id) => ({
        url: `admin/cancel-appointment`,
        method: "DELETE",
        body: _id,
      }),
    }),
    deactivateDoctor: builder.mutation({
      query: (_id) => ({
        url: `admin/deactivate-doctor`,
        method: "PATCH",
        body: _id,
      }),
    }),
    activateDoctor: builder.mutation({
      query: (_id) => ({
        url: `admin/activate-doctor`,
        method: "PATCH",
        body: _id,
      }),
    }),
    togglePatientStatus: builder.mutation({
      query: (_id) => ({
        url: `admin/toggle-patient-status`,
        method: "PATCH",
        body: _id,
      }),
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useGetAllAppointmentsQuery,
  useGetAllPatientsQuery,
  useAdminCancelAppointmentMutation,
  useDeactivateDoctorMutation,
  useActivateDoctorMutation,
  useTogglePatientStatusMutation,
} = AdminApi;
