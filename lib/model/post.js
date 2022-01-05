export async function create(db, body) {
  let post = Object.fromEntries(body);
  let title = post.title;
  let slug = title.toLowerCase().replace(/\W/g, "-");
  let created_at = Date.now();

  let key = `post::${slug}`;
  let data = Object.fromEntries(body);
  await db.put(key, JSON.stringify(data), {
    metadata: { title, slug, created_at },
  });

  return slug;
}

export function get(db, slug) {
  return db.getWithMetadata(`post::${slug}`, {
    type: "json",
  });
}

export async function list(db) {
  let prefix = "post::";
  let result = await db.list({ prefix });
  return result.keys.map((key) => key.metadata);
}
