import { html, send } from "../../../lib/helpers.js";
import { get } from "../../../lib/model/post.js";

export async function onRequestGet({ params, env }) {
  let post = await get(env.DB, params.slug);
  console.log(post);
  let title = params.slug;
  let body = html` <h1>${title}</h1> `;
  return send(title, body);
}
