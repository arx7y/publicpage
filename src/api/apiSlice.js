import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userActions } from "../store/userSlice";
import { logOut } from "../store/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("this log is coming from apiSlice ", result);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      console.log("this log is coming from apiSlice ", refreshResult.data);
      // store the new token
      api.dispatch(userActions.setAccessToken(refreshResult.data));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('clearing data');
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Company", "Task", "Form", "Request", "Notification"],
  endpoints: (builder) => ({}),
});
