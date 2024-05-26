/// <reference types="node" resolution-mode="require"/>
import type { App } from 'astro/app';
import type { IncomingMessage, ServerResponse } from 'node:http';
export declare function getRequest(base: string, req: IncomingMessage, bodySizeLimit?: number): Promise<Request>;
export declare function setResponse(app: App, res: ServerResponse, response: Response): Promise<void>;
