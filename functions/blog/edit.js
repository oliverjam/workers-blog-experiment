import { html, send } from "../../lib/helpers.js";
import { list } from "../../lib/model/post.js";
import { auth } from "../../lib/auth.js";

export const onRequestGet = [auth, get];

async function get({ env }) {
  let posts = await list(env.DB);
  let title = "Blog posts";
  let body = html`
    <h1>${title}</h1>
    <a href="new">New post</a>
    <ul>
      ${posts
        .map((post) => {
          let datetime = new Date(post.created_at);
          let created = datetime.toLocaleString("en-GB");
          return html`<li>
            <a href="/blog/${post.slug}/edit">${post.title}</a>
            <time datetime="${datetime}" title="${datetime}">${created}</time>
          </li>`;
        })
        .join("\n")}
    </ul>
  `;
  return send(title, body);
}
