import { App } from "astro/app";
import { applyPolyfills } from "astro/app/node";
import { ASTRO_LOCALS_HEADER } from "./adapter.js";
import { getRequest, setResponse } from "./request-transform.js";
applyPolyfills();
const createExports = (manifest) => {
  const app = new App(manifest);
  const handler = async (req, res) => {
    let request;
    try {
      request = await getRequest(`https://${req.headers.host}`, req);
    } catch (err) {
      res.statusCode = err.status || 400;
      return res.end(err.reason || "Invalid request body");
    }
    let routeData = app.match(request);
    let locals = {};
    if (request.headers.has(ASTRO_LOCALS_HEADER)) {
      let localsAsString = request.headers.get(ASTRO_LOCALS_HEADER);
      if (localsAsString) {
        locals = JSON.parse(localsAsString);
      }
    }
    await setResponse(app, res, await app.render(request, routeData, locals));
  };
  return { default: handler };
};
export {
  createExports
};
