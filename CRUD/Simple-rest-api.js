const http = require("node:http");
const {
  getSubjects,
  getSubject,
  addSubject,
  updateSubject,
  patchSubject,
  removeSubject,
} = require("./SubjectRepository");
const {
  json,
  noContent,
  notFound,
  badRequest,
  conflict,
  methodNotAllowed,
  unsupportedMediaType,
  parseBody,
} = require("./Utility");

// Router using WHATWG URL
function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  if (pathname === "/subjects") {
    if (req.method === "GET") {
      return json(res, 200, getSubjects());
    }
    if (req.method === "POST") {
      (async () => {
        try {
          const parsed = await parseBody(req);
          const data = parsed.data || {};
          if (!data || typeof data !== "object")
            return badRequest(res, "Body must be an object");
          const { id, name, credits } = data;
          if (!id || !name || typeof credits !== "number") {
            return badRequest(
              res,
              "Fields required: id(string), name(string), credits(number)"
            );
          }
          if (getSubject(id))
            return conflict(res, `Subject with id "${id}" already exists`);
          addSubject({ id, name, credits });
          return json(res, 201, { id, name, credits });
        } catch (e) {
          if (e && e.message === "UNSUPPORTED_CT")
            return unsupportedMediaType(res);
          return badRequest(res, e.message || "Bad Request");
        }
      })();
      return;
    }
    return methodNotAllowed(res);
  }
  const server = http.createServer(router);
  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
  if (pathname.startsWith("/subjects/")) {
    const id = decodeURIComponent(pathname.slice("/subjects/".length));
    if (!id) return notFound(res);
    if (req.method === "GET") {
      const subject = getSubject(id);
      return subject
        ? json(res, 200, subject)
        : notFound(res, `Subject "${id}" not found`);
    }
    if (req.method === "PUT") {
      (async () => {
        try {
          const parsed = await parseBody(req);
          const data = parsed.data || {};
          if (!data || typeof data !== "object")
            return badRequest(res, "Body must be an object");
          const { name, credits } = data;
          if (!name || typeof credits !== "number") {
            return badRequest(
              res,
              "Fields required: name(string), credits(number)"
            );
          }
          const exists = getSubject(id);
          if (!exists) return notFound(res, `Subject "${id}" not found`);
          updateSubject(id, { id, name, credits });
          return json(res, 200, { id, name, credits });
        } catch (e) {
          if (e && e.message === "UNSUPPORTED_CT")
            return unsupportedMediaType(res);
          return badRequest(res, e.message || "Bad Request");
        }
      })();
      return;
    }
    if (req.method === "DELETE") {
      const ok = removeSubject(id);
      return ok ? noContent(res) : notFound(res, `Subject "${id}" not found`);
    }
    return methodNotAllowed(res);
  }
  // Default 404
  notFound(res);
}
