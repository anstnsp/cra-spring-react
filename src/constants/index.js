export const API_BASE_URL = "http://localhost:8080";
export const ACCESS_TOKEN = "accessToken";

// export const OAUTH2_REDIRECT_URI = "http://localhost:2222/oauth2/redirect";
export const OAUTH2_REDIRECT_URI = "http://localhost:2222/oauth2";
// export const OAUTH2_REDIRECT_URI =
//   "http://localhost:8080/login/oauth2/code/google";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;

export const GITHUB_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
