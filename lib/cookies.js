import { create } from "./cookie.js";

export const session_cookie = create("sid", {
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
});

export const flash_cookie = create("flash", {
  path: "/",
  httpOnly: true,
});
