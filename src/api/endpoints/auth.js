import protectedApi from "../protectedApi";
import publicApi from "../publicApi";
import { setAccessToken } from "../../services/tokenService";

export const refreshToken = async () => {
  const response = await publicApi.post("/auth/refresh");
  const data = response.data;

  // data must contain: access_token, expires_in
  setAccessToken(data);

  return data;
};

export const loginRequest = async ({ email, password }) => {
  const response = await publicApi.post("/auth/login", {
    email,
    password,
  });

  const data = response.data;

  // data must contain: access_token, expires_in
  setAccessToken(data);

  return data;
};

export const getAuthenticatedAdmin = async () => {
  return protectedApi.get("/auth/admin");
};

export const logoutRequest = async () => {
  return protectedApi.post("/auth/logout");
};
