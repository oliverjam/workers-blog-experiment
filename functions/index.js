export function onRequestGet() {
  let now = new Date().toLocaleTimeString("en-GB");
  return new Response(`<h1>It is ${now}</h1><a href="/">Reload</a>`, {
    headers: {
      "content-type": "text/html",
      "cache-control": "public, max-age=0, s-maxage=60",
    },
  });
}
