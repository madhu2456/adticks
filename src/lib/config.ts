export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "/app";

export const authUrls = {
  googleLogin: `${API_BASE_URL}/auth/google/login`,
  me: `${API_BASE_URL}/auth/me`,
  logout: `${API_BASE_URL}/auth/logout`,
  audits: `${API_BASE_URL}/audits`,
};

export function getGoogleLoginUrl(returnTo = APP_BASE_URL) {
  const params = new URLSearchParams({ return_to: returnTo });
  return `${authUrls.googleLogin}?${params.toString()}`;
}
