import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  socketIoLink: "",
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  loginMethod: "local",
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setSocketIoLink(state, action) {
      state.socketIoLink = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    addRoles(state, action) {
      state.roles.push(...action.payload);
    },
    removeRoles(state, action) {
      state.roles.filter((role) => role !== action.payload);
    },
    logOut(state, action) {
      state = { ...initialState };
    },
    logIn(state, action) {
      // state.refreshToken = action.payload.refreshToken;
      // state.socketIoLink = action.payload.socketIoLink;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.roles = [...action.payload.roles];
      state.loginMethod = action.payload.loginMethod;
    },
    initializeAuthState(state, action) {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.roles = [...state.roles];
    },
  },
});

export const logIn = createAsyncThunk(
  "user/logIn",
  async (credentials, { dispatch }) => {
    try {
      dispatch(
        userActions.logIn({
          accessToken: credentials.accessToken,
          roles: credentials.roles,
        })
      ); //hardcoded values
      localStorage.setItem("access_token", credentials.accessToken);
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      console.log("login error", error);
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { dispatch }) => {
    try {
      dispatch(userActions.logOut());
      localStorage.removeItem("access_token");
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.log("logout error", error);
    }
  }
);

export const initializeAuthFromLocalStorage = () => (dispatch) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    dispatch(
      userActions.logIn({
        accessToken,
        isAuthenticated,
        roles: [201, 202, 203],
      }) //change roles logic here
    );
  }
};

export const selectCurrentToken = (state) => state.user.accessToken;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectRoles = (state) => state.user.roles;

export default userSlice;

export const userActions = userSlice.actions;
