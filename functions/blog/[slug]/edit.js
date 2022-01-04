import { html, send } from "../../../lib/helpers.js";

export async function onRequestGet({ params, env }) {
  let title = `Editing: ${params.slug}`;
  let body = html` <h1>${title}</h1> `;
  return send(title, body);
}
