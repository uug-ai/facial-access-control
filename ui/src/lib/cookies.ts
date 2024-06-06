import { getCookie } from "cookies-next";

// helpers to get cookies
const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie, "base64").toString("ascii");
};

export const getValidAuthTokens = () => {
  const token = getAuthCookie("auth_token");

  const now = new Date();
  const tokenDate = new Date(token || 0);

  return {
    token: now < tokenDate ? token : undefined,
  };
};
