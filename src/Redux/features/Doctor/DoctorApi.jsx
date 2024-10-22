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
    DocClearNotification: builder.mutation({
      query: (_id) => ({
        url: "doctor/clearnotification",
        method: "DELETE",
        body: _id,
      }),
    }),
    updateDocDetails: builder.mutation({
      query: (values) => ({
        url: "doctor/updatedocdetail",
        method: "PATCH",
        body: values,
      }),
    }),
    getDocAppointment: builder.query({
      query: (_id) => ({
        url: `doctor/getdoctorappointment/${_id}`,
        method: "GET",
      }),
    }),
    updateAppointment: builder.mutation({
      query: (data) => ({
        url: "doctor/update-appointment",
        method: "PATCH",
        body: data,
      }),
    }),
    markAsReadNotification: builder.mutation({
      query: (notificationIds) => ({
        url: "doctor/markAsRead",
        method: "PATCH",
        body: notificationIds,
      }),
    }),
  }),
});

export const {
  useDoctorLoginMutation,
  useDoctorLogoutMutation,
  useDoctorfirstTimeChangePwdMutation,
  useDocClearNotificationMutation,
  useGetDocAppointmentQuery,
  useUpdateDocDetailsMutation,
  useUpdateAppointmentMutation,
  useMarkAsReadNotificationMutation,
} = DoctorApi;
