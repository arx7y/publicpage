import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { msalInstance } from "../App";
import { loginRequest } from "../api/msalConfig";

const useGetAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const loginType = useSelector((state) => state.user.loginType); // Let's assume this is either 'local' or 'msal'

  const getAccessToken = async () => {
    if (loginType === "local") {
      try {
        const response = await axios.get("/refresh", {
          headers: {
            AuthorizationMain: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        });
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error("Error refreshing local token", error);
      }
    } else if (loginType === "azure") {
      try {
        const account = msalInstance.getActiveAccount();
        if (!account) {
          throw new Error("No active account");
        }
        const response = await msalInstance.acquireTokenSilent({
          scopes: loginRequest.scopes,
          account: account,
        });
        setAccessToken(response.accessToken);
      } catch (error) {
        console.error("Error acquiring MSAL token", error);
      }
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [refreshToken, loginType]);

  return accessToken;
};

export default useGetAccessToken;
