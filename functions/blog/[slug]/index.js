import { html, send } from "../../../lib/helpers.js";

export async function onRequestGet({ params, env }) {
  let post = await env.DB.getWithMetadata(`post::${params.slug}`, {
    type: "json",
  });
  console.log(post);
  let title = params.slug;
  let body = html` <h1>${title}</h1> `;
  return send(title, body);
}
