import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ASTRO_LOCALS_HEADER } from "./adapter.js";
async function generateEdgeMiddleware(astroMiddlewareEntryPointPath, outPath, vercelEdgeMiddlewareHandlerPath) {
  const entryPointPathURLAsString = JSON.stringify(
    fileURLToPath(astroMiddlewareEntryPointPath).replace(/\\/g, "/")
  );
  const code = edgeMiddlewareTemplate(entryPointPathURLAsString, vercelEdgeMiddlewareHandlerPath);
  const bundledFilePath = join(outPath, "middleware.mjs");
  const esbuild = await import("esbuild");
  await esbuild.build({
    stdin: {
      contents: code,
      resolveDir: process.cwd()
    },
    target: "es2020",
    platform: "browser",
    // https://runtime-keys.proposal.wintercg.org/#edge-light
    conditions: ["edge-light", "worker", "browser"],
    external: ["astro/middleware"],
    outfile: bundledFilePath,
    allowOverwrite: true,
    format: "esm",
    bundle: true,
    minify: false
  });
  return pathToFileURL(bundledFilePath);
}
function edgeMiddlewareTemplate(middlewarePath, vercelEdgeMiddlewareHandlerPath) {
  const filePathEdgeMiddleware = fileURLToPath(vercelEdgeMiddlewareHandlerPath);
  let handlerTemplateImport = "";
  let handlerTemplateCall = "{}";
  if (existsSync(filePathEdgeMiddleware + ".js") || existsSync(filePathEdgeMiddleware + ".ts")) {
    const stringified = JSON.stringify(filePathEdgeMiddleware.replace(/\\/g, "/"));
    handlerTemplateImport = `import handler from ${stringified}`;
    handlerTemplateCall = `handler({ request, context })`;
  } else {
  }
  return `
	${handlerTemplateImport}
import { onRequest } from ${middlewarePath};
import { createContext, trySerializeLocals } from 'astro/middleware';
export default async function middleware(request, context) {
	const url = new URL(request.url);
	const ctx = createContext({
		request,
		params: {}
	});
	ctx.locals = ${handlerTemplateCall};
	const next = async () => {
		const response = await fetch(url, {
			headers: {
				${JSON.stringify(ASTRO_LOCALS_HEADER)}: trySerializeLocals(ctx.locals)
			}
		});
		return response;
	};

	return onRequest(ctx, next);
}`;
}
export {
  generateEdgeMiddleware
};
