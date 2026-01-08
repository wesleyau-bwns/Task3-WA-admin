import axios from "axios";
import { getDeviceId } from "../utils/deviceUtils";

const publicApi = axios.create({
  baseURL: "https://bpsp-api-admin.bw-group.cc/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // IMPORTANT for refresh cookie
});

publicApi.interceptors.request.use((config) => {
  config.headers["X-Device-Id"] = getDeviceId();
  return config;
});

export default publicApi;
