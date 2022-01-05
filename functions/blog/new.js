import { auth } from "../../lib/auth.js";
import { html, redirect, send } from "../../lib/helpers.js";
import { create } from "../../lib/model/post.js";

export const onRequestGet = [auth, get];
export const onRequestPost = [auth, post];

export async function get() {
  let title = "New post";
  let body = html`
    <h1>${title}</h1>
    <form method="POST">
      <label for="title">Title</label>
      <input id="title" name="title" />

      <label for="body">Title</label>
      <textarea id="body" name="body"></textarea>

      <button>Save</button>
    </form>
  `;
  return send(title, body);
}

export async function post({ request, env }) {
  let body = await request.formData();
  let slug = await create(env.DB, body);
  return redirect(`/blog/${slug}`);
}
