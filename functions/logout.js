import { html, redirect, send } from "../lib/helpers.js";
import * as session from "../lib/model/session.js";
import { session_cookie } from "../lib/cookies.js";

export async function onRequestPost({ request, env }) {
  let sid = session_cookie.read(request.headers.get("cookie"));
  await session.destroy(env.DB, sid);
  return redirect("/", {
    headers: { "set-cookie": session_cookie.clear() },
  });
}
