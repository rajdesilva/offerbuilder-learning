import { init as initApm } from "@elastic/apm-rum";

export const baseURL = {
  API_URL_BASE: process.env.REACT_APP_BASE_API_URL,
  LOGIN_URL: process.env.REACT_APP_LOGIN_URL,
  LOGOUT_URL: process.env.REACT_APP_LOGOUT_URL,
  PROFILE_URL: process.env.REACT_APP_USER_PROFILE_URL,
  HISTORY_URL: process.env.REACT_APP_USER_HISTORY_URL,
};

export const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: process.env.REACT_APP_APM_SERVICE_NAME,
  serverUrl: process.env.REACT_APP_APM_SERVICE_URL,

  // Set service version (required for sourcemap feature)
  serviceVersion: process.env.REACT_APP_APM_SERVICE_VERSION,
});