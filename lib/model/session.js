function prefix(sid) {
  return `session::${sid}`;
}

export async function retrieve(db, sid) {
  return await db.get(prefix(sid), { type: "json" });
}

export async function create(db, data) {
  let sid = crypto.randomUUID();
  await db.put(prefix(sid), data);
  return sid;
}
