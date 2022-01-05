import { redirect } from "./helpers.js";
import { retrieve } from "./model/session.js";

export async function auth({ request, env, next }) {
  let header = request.headers.get("cookie");
  if (!header) {
    return redirect("/login");
  }
  let cookies = parse(header);
  let sid = cookies.get("sid");
  let session = await retrieve(env.DB, sid);
  console.log({ session });
  if (!session || session.role !== "admin") {
    return redirect("/login");
  } else {
    return next();
  }
}

function parse(header) {
  let values = header.split("; ");
  return new Map(values.map((pair) => pair.split("=")));
}
