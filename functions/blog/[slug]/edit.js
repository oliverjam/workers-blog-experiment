import { auth } from "../../../lib/auth.js";
import { html, send } from "../../../lib/helpers.js";

export const onRequestGet = [auth, get];

export async function get({ params, env }) {
  let title = `Editing: ${params.slug}`;
  let body = html` <h1>${title}</h1> `;
  return send(title, body);
}
