import { session_cookie } from "./cookies.js";
import { redirect } from "./helpers.js";
import { retrieve } from "./model/session.js";

export async function auth({ request, env, next }) {
  let header = request.headers.get("cookie");
  if (!header) {
    return redirect("/login");
  }
  let sid = session_cookie.read(header);
  let session = await retrieve(env.DB, sid);
  if (!session || session.role !== "admin") {
    return redirect("/login");
  } else {
    return next();
  }
}
