import { html, redirect, send } from "../lib/helpers.js";
import { create } from "../lib/model/session.js";
import { session_cookie, flash_cookie } from "../lib/cookies.js";

export function onRequestGet({ request }) {
  let flash = flash_cookie.read(request.headers.get("cookie"));
  let title = "Log in";
  let body = html`
    <h1>${title}</h1>
    <form method="POST">
      <label for="pw">Admin password</label>
      <input
        type="password"
        id="pw"
        name="pw"
        aria-describedby="pw_error"
        required
      />
      ${flash === "pw_error"
        ? html`<p id="pw_error" style="color: red">Password does not match</p>`
        : ""}
      <button>Log in</button>
    </form>
  `;
  let response = send(title, body);
  if (flash) {
    response.headers.append("set-cookie", flash_cookie.clear());
  }
  return response;
}

export async function onRequestPost({ request, env }) {
  let body = await request.formData();
  let pw = body.get("pw");
  if (pw !== env.ADMIN_PW) {
    return redirect("/login", {
      headers: { "set-cookie": flash_cookie.write("pw_error") },
    });
  } else {
    let sid = await create(env.DB, { role: "admin" });
    return redirect("/blog/edit", {
      headers: { "set-cookie": session_cookie.write(sid) },
    });
  }
}
