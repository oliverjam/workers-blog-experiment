export const html = String.raw;

export function send(title, body, status = 200) {
  return new Response(doc(title, body), {
    status,
    headers: { "content-type": "text/html" },
  });
}

export function redirect(location, init = 303) {
  if (typeof init === "number") {
    return new Response(null, { status: init, headers: { location } });
  } else {
    let status = init.status || 303;
    let headers = { ...init.headers, location };
    return new Response(null, { ...init, status, headers });
  }
}

function doc(title, body) {
  return html`
    <!DOCTYPE html>
    <html>
      <meta charset="utf-8" />
      <title>${title}</title>
      <body>
        ${body}
      </body>
    </html>
  `;
}
