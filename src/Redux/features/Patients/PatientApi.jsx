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
      query: (_id) => ({
        url: "patient/logout",
        method: "POST",
        body: _id,
      }),
    }),
    getdoctor: builder.query({
      query: (_id) => ({
        url: `patient/getdoctor/${_id}`,
        method: "GET",
      }),
    }),
    BookAppointment: builder.mutation({
      query: (data) => ({
        url: "patient/book-appointment",
        method: "POST",
        body: data,
      }),
    }),
    getPatientAppointment: builder.query({
      query: (_id) => ({
        url: `patient/get-appointment/${_id}`,
        method: "GET",
      }),
    }),
    updatePatientDetails: builder.mutation({
      query: (values) => ({
        url: "patient/updatepatient",
        method: "PATCH",
        body: values,
      }),
    }),
    updatePatientPic: builder.mutation({
      query: (formData) => ({
        url: "patient/updatepic",
        method: "PATCH",
        body: formData,
      }),
    }),
    clearNotification: builder.mutation({
      query: (_id) => ({
        url: "patient/clearnotification",
        method: "DELETE",
        body: _id,
      }),
    }),
    cancelPatientNotification: builder.mutation({
      query: (_id) => ({
        url: "patient/cnacel-appointment",
        method: "DELETE",
        body: _id,
      }),
    }),
    markAsReadNotificationPatient: builder.mutation({
      query: (notificationIds) => ({
        url: "patient/markAsRead",
        method: "PATCH",
        body: notificationIds,
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  usePatientLoginMutation,
  usePatientLogoutMutation,
  useGetdoctorQuery,
  useBookAppointmentMutation,
  useGetPatientAppointmentQuery,
  useUpdatePatientDetailsMutation,
  useUpdatePatientPicMutation,
  useClearNotificationMutation,
  useCancelPatientNotificationMutation,
  useMarkAsReadNotificationPatientMutation,
} = patientApi;
