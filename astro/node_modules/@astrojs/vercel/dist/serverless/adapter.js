import { AstroError } from "astro/errors";
import glob from "fast-glob";
import { basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  getAstroImageConfig,
  getDefaultImageConfig
} from "../image/shared.js";
import { getVercelOutput, removeDir, writeJson } from "../lib/fs.js";
import { copyDependenciesToFunction } from "../lib/nft.js";
import { getRedirects } from "../lib/redirects.js";
import {
  getSpeedInsightsViteConfig
} from "../lib/speed-insights.js";
import {
  getInjectableWebAnalyticsContent
} from "../lib/web-analytics.js";
import { generateEdgeMiddleware } from "./middleware.js";
const PACKAGE_NAME = "@astrojs/vercel/serverless";
const ASTRO_LOCALS_HEADER = "x-astro-locals";
const VERCEL_EDGE_MIDDLEWARE_FILE = "vercel-edge-middleware";
const SUPPORTED_NODE_VERSIONS = {
  14: { status: "deprecated", removal: /* @__PURE__ */ new Date("August 15 2023") },
  16: { status: "deprecated", removal: /* @__PURE__ */ new Date("February 6 2024") },
  18: { status: "current" }
};
function getAdapter({
  edgeMiddleware,
  functionPerRoute
}) {
  return {
    name: PACKAGE_NAME,
    serverEntrypoint: `${PACKAGE_NAME}/entrypoint`,
    exports: ["default"],
    adapterFeatures: {
      edgeMiddleware,
      functionPerRoute
    },
    supportedAstroFeatures: {
      hybridOutput: "stable",
      staticOutput: "stable",
      serverOutput: "stable",
      assets: {
        supportKind: "stable",
        isSharpCompatible: true,
        isSquooshCompatible: true
      }
    }
  };
}
function vercelServerless({
  analytics,
  webAnalytics,
  speedInsights,
  includeFiles,
  excludeFiles,
  imageService,
  imagesConfig,
  devImageService = "sharp",
  functionPerRoute = false,
  edgeMiddleware = false
} = {}) {
  let _config;
  let buildTempFolder;
  let serverEntry;
  let _entryPoints;
  const extraFilesToInclude = [];
  const NTF_CACHE = /* @__PURE__ */ Object.create(null);
  async function createFunctionFolder(funcName, entry, inc, logger) {
    const functionFolder = new URL(`./functions/${funcName}.func/`, _config.outDir);
    const { handler } = await copyDependenciesToFunction(
      {
        entry,
        outDir: functionFolder,
        includeFiles: inc,
        excludeFiles: excludeFiles?.map((file) => new URL(file, _config.root)) || [],
        logger
      },
      NTF_CACHE
    );
    await writeJson(new URL(`./package.json`, functionFolder), {
      type: "module"
    });
    await writeJson(new URL(`./.vc-config.json`, functionFolder), {
      runtime: getRuntime(),
      handler,
      launcherType: "Nodejs"
    });
  }
  return {
    name: PACKAGE_NAME,
    hooks: {
      "astro:config:setup": async ({ command, config, updateConfig, injectScript, logger }) => {
        if (webAnalytics?.enabled || analytics) {
          if (analytics) {
            logger.warn(
              `The \`analytics\` property is deprecated. Please use the new \`webAnalytics\` and \`speedInsights\` properties instead.`
            );
          }
          injectScript(
            "head-inline",
            await getInjectableWebAnalyticsContent({
              mode: command === "dev" ? "development" : "production"
            })
          );
        }
        if (command === "build" && (speedInsights?.enabled || analytics)) {
          injectScript("page", 'import "@astrojs/vercel/speed-insights"');
        }
        const outDir = getVercelOutput(config.root);
        updateConfig({
          outDir,
          build: {
            serverEntry: "entry.mjs",
            client: new URL("./static/", outDir),
            server: new URL("./dist/", config.root)
          },
          vite: {
            ...getSpeedInsightsViteConfig(speedInsights?.enabled || analytics),
            ssr: {
              external: ["@vercel/nft"]
            }
          },
          ...getAstroImageConfig(
            imageService,
            imagesConfig,
            command,
            devImageService,
            config.image
          )
        });
      },
      "astro:config:done": ({ setAdapter, config, logger }) => {
        if (functionPerRoute === true) {
          logger.warn(
            `Vercel's hosting plans might have limits to the number of functions you can create.
Make sure to check your plan carefully to avoid incurring additional costs.
You can set functionPerRoute: false to prevent surpassing the limit.`
          );
        }
        setAdapter(getAdapter({ functionPerRoute, edgeMiddleware }));
        _config = config;
        buildTempFolder = config.build.server;
        serverEntry = config.build.serverEntry;
        if (config.output === "static") {
          throw new AstroError(
            '`output: "server"` or `output: "hybrid"` is required to use the serverless adapter.'
          );
        }
      },
      "astro:build:ssr": async ({ entryPoints, middlewareEntryPoint }) => {
        _entryPoints = entryPoints;
        if (middlewareEntryPoint) {
          const outPath = fileURLToPath(buildTempFolder);
          const vercelEdgeMiddlewareHandlerPath = new URL(
            VERCEL_EDGE_MIDDLEWARE_FILE,
            _config.srcDir
          );
          const bundledMiddlewarePath = await generateEdgeMiddleware(
            middlewareEntryPoint,
            outPath,
            vercelEdgeMiddlewareHandlerPath
          );
          extraFilesToInclude.push(bundledMiddlewarePath);
        }
      },
      "astro:build:done": async ({ routes, logger }) => {
        if (_config.vite.assetsInclude) {
          const mergeGlobbedIncludes = (globPattern) => {
            if (typeof globPattern === "string") {
              const entries = glob.sync(globPattern).map((p) => pathToFileURL(p));
              extraFilesToInclude.push(...entries);
            } else if (Array.isArray(globPattern)) {
              for (const pattern of globPattern) {
                mergeGlobbedIncludes(pattern);
              }
            }
          };
          mergeGlobbedIncludes(_config.vite.assetsInclude);
        }
        const routeDefinitions = [];
        const filesToInclude = includeFiles?.map((file) => new URL(file, _config.root)) || [];
        filesToInclude.push(...extraFilesToInclude);
        validateRuntime();
        if (_entryPoints.size) {
          const getRouteFuncName = (route) => route.component.replace("src/pages/", "");
          const getFallbackFuncName = (entryFile) => basename(entryFile.toString()).replace("entry.", "").replace(/\.mjs$/, "");
          for (const [route, entryFile] of _entryPoints) {
            const func = route.component.startsWith("src/pages/") ? getRouteFuncName(route) : getFallbackFuncName(entryFile);
            await createFunctionFolder(func, entryFile, filesToInclude, logger);
            routeDefinitions.push({
              src: route.pattern.source,
              dest: func
            });
          }
        } else {
          await createFunctionFolder(
            "render",
            new URL(serverEntry, buildTempFolder),
            filesToInclude,
            logger
          );
          routeDefinitions.push({ src: "/.*", dest: "render" });
        }
        await writeJson(new URL(`./config.json`, _config.outDir), {
          version: 3,
          routes: [
            ...getRedirects(routes, _config),
            {
              src: `^/${_config.build.assets}/(.*)$`,
              headers: { "cache-control": "public, max-age=31536000, immutable" },
              continue: true
            },
            { handle: "filesystem" },
            ...routeDefinitions
          ],
          ...imageService || imagesConfig ? {
            images: imagesConfig ? {
              ...imagesConfig,
              domains: [...imagesConfig.domains, ..._config.image.domains],
              remotePatterns: [
                ...imagesConfig.remotePatterns ?? [],
                ..._config.image.remotePatterns
              ]
            } : getDefaultImageConfig(_config.image)
          } : {}
        });
        await removeDir(buildTempFolder);
      }
    }
  };
}
function validateRuntime() {
  const version = process.version.slice(1);
  const major = version.split(".")[0];
  const support = SUPPORTED_NODE_VERSIONS[major];
  if (support === void 0) {
    console.warn(
      `[${PACKAGE_NAME}] The local Node.js version (${major}) is not supported by Vercel Serverless Functions.`
    );
    console.warn(`[${PACKAGE_NAME}] Your project will use Node.js 18 as the runtime instead.`);
    console.warn(`[${PACKAGE_NAME}] Consider switching your local version to 18.`);
    return;
  }
  if (support.status === "deprecated") {
    console.warn(
      `[${PACKAGE_NAME}] Your project is being built for Node.js ${major} as the runtime.`
    );
    console.warn(
      `[${PACKAGE_NAME}] This version is deprecated by Vercel Serverless Functions, and scheduled to be disabled on ${new Intl.DateTimeFormat(
        void 0,
        { dateStyle: "long" }
      ).format(support.removal)}.`
    );
    console.warn(`[${PACKAGE_NAME}] Consider upgrading your local version to 18.`);
  }
}
function getRuntime() {
  const version = process.version.slice(1);
  const major = version.split(".")[0];
  const support = SUPPORTED_NODE_VERSIONS[major];
  if (support === void 0) {
    return "nodejs18.x";
  }
  return `nodejs${major}.x`;
}
export {
  ASTRO_LOCALS_HEADER,
  VERCEL_EDGE_MIDDLEWARE_FILE,
  vercelServerless as default
};
