import { parse } from "../lib/cookie.js";
import { html, redirect, send } from "../lib/helpers.js";
import { create } from "../lib/model/session.js";

export function onRequestGet({ request }) {
  let cookies = parse(request.headers.get("cookie"));
  let flash = cookies && cookies.get("flash");
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
    let cookie = `flash=0; Path=/; HttpOnly; MaxAge=0`;
    response.headers.append("set-cookie", cookie);
  }
  return response;
}

export async function onRequestPost({ request, env }) {
  let body = await request.formData();
  let pw = body.get("pw");
  if (pw !== env.ADMIN_PW) {
    let cookie = `flash=pw_error; Path=/; HttpOnly`;
    return redirect("/login", { headers: { "set-cookie": cookie } });
  } else {
    let sid = await create(env.DB, JSON.stringify({ role: "admin" }));
    let one_week = 1000 * 60 * 60 * 24 * 7;
    let cookie = `sid=${sid}; Path=/; Max-Age=${one_week}; HttpOnly`;
    return redirect("/blog/edit", { headers: { "set-cookie": cookie } });
  }
}
