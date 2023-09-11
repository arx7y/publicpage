import axios from "../api/axios";

import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/userSlice";

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refreshToken = useSelector(state=>state.user.refreshToken);
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            headers: {
              AuthorizationMain: `Bearer ${refreshToken}`,
            },
            withCredentials: true
        })
        dispatch(userActions.setAccessToken(response.data.accessToken));
        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;
