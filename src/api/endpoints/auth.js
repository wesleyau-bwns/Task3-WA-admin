import protectedApi from "../protectedApi";
import publicApi from "../publicApi";
import { setAccessToken, clearTokens } from "../../utils/tokenService";

export const refreshToken = async () => {
  try {
    const response = await publicApi.post("/auth/refresh");
    const data = response.data;

    // data must contain: access_token, expires_in
    setAccessToken(data);

    return data;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

export const logoutRequest = async () => {
  return protectedApi.post("/auth/logout");
};
