let accessToken = null;
let expiresAt = null;

export const getAccessToken = () => accessToken;

export const hasAccessToken = () => accessToken !== null;

export const isTokenExpired = () => {
  return !expiresAt || Date.now() > expiresAt;
};

export const setAccessToken = ({ access_token, expires_in }) => {
  accessToken = access_token;
  expiresAt = Date.now() + expires_in * 1000;
};

export const clearTokens = () => {
  accessToken = null;
  expiresAt = null;
};
