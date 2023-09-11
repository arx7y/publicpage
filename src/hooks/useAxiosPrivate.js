import { axiosPrivate } from "../api/axios";
import React, { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import useGetAccessToken from "./useGetAccessToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const getAccessToken = useGetAccessToken();
  const [forceUpdate, setForceUpdate] = React.useState(false); // Added this state to force rerender

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        const token = await getAccessToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          setForceUpdate(!forceUpdate); // Trigger a state change to rerun useEffect
          return axiosPrivate(prevRequest);
        }
        dispatch(userActions.logOut());
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, getAccessToken, forceUpdate]); // Added forceUpdate here

  return axiosPrivate;
};

export default useAxiosPrivate;
