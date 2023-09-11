import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications",
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedNotifications = responseData.map((notification) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
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
      query: (id) => `/notifications/?notificationId=${id}`,
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedNotifications = responseData.map((notification) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
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

export const selectNotificationsResult =
  extendedApiSlice.endpoints.getNotifications.select();

// Creates memoized selector
const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationResult) => notificationResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
  // Pass in a selector that returns the posts slice of state
} = notificationAdapter.getSelectors(
  (state) => selectNotificationsData(state) ?? initialState
);

export const { useGetNotificationsQuery, useGetNotificationByIdQuery } =
  extendedApiSlice;
