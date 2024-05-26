/// <reference types="node" resolution-mode="require"/>
import type { SSRManifest } from 'astro';
import type { IncomingMessage, ServerResponse } from 'node:http';
export declare const createExports: (manifest: SSRManifest) => {
    default: (req: IncomingMessage, res: ServerResponse) => Promise<ServerResponse<IncomingMessage> | undefined>;
};
