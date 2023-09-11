import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { socketClient } from "../index";
import { apiSlice } from "../api/apiSlice";
import store from "../store";

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
});

const initialState = notificationAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications",
      transformResponse: (responseData) => {
        const loadedNotifications = responseData.map((notification) => {
          return notification;
        });
        return notificationAdapter.setAll(initialState, loadedNotifications);
      },
      providesTags: (result, error, arg) => [
        { type: "Notification", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Notification", id })),
      ],
    }),
    getNotificationById: builder.query({
      query: (id) => `/notifications/${id}`, // Changed the URL here
      transformResponse: (responseData) => {
        const loadedNotifications = responseData.map((notification) => {
          return notification;
        });
        return notificationAdapter.setAll(initialState, loadedNotifications);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Notification", id })),
      ],
    }),
  }),
});

export const { useGetNotificationsQuery, useGetNotificationByIdQuery } =
  extendedApiSlice;

export const selectNotificationsResult =
  extendedApiSlice.endpoints.getNotifications.select();

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data
);

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationAdapter.getSelectors(
  (state) => selectNotificationsData(state) ?? initialState
);
