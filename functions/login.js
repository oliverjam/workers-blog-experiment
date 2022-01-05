import { html, redirect, send } from "../lib/helpers.js";
import { create } from "../lib/model/session.js";

export function onRequestGet() {
  let title = "Log in";
  let body = html`
    <h1>${title}</h1>
    <form method="POST">
      <label for="pw">Admin password</label>
      <input type="password" id="pw" name="pw" />

      <button>Log in</button>
    </form>
  `;
  return send(title, body);
}

export async function onRequestPost({ request, env }) {
  let body = await request.formData();
  let pw = body.get("pw");
  if (pw !== env.ADMIN_PW) {
    return redirect("");
  } else {
    let sid = await create(env.DB, JSON.stringify({ role: "admin" }));
    let one_week = 1000 * 60 * 60 * 24 * 7;
    let cookie = `sid=${sid}; Path=/; Max-Age=${one_week}; HttpOnly`;
    return redirect("/blog/edit", { headers: { "set-cookie": cookie } });
  }
}
