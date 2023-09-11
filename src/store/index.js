import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { apiSlice } from "../api/apiSlice";
import socketReducer from "../socket/socketSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: socketReducer,
    [apiSlice.reducer]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
