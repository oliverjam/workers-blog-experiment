function prefix(sid) {
  return `session::${sid}`;
}

export async function retrieve(db, sid) {
  let key = prefix(sid);
  return await db.get(key, { type: "json" });
}

export async function create(db, data) {
  let sid = crypto.randomUUID();
  let key = prefix(sid);
  let one_week = 60 * 60 * 24 * 7;
  await db.put(key, JSON.stringify(data), {
    expirationTtl: one_week,
  });
  return sid;
}

export async function destroy(db, sid) {
  return db.delete(sid);
}
