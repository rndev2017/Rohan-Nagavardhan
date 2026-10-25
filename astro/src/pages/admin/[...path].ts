import type {APIRoute} from 'astro';

// Old embedded-Studio deep links should still lead to the canonical Studio.
export const prerender = false;
export const GET: APIRoute = () => new Response(null, {
  status: 302,
  headers: {Location: 'https://rohansogal.sanity.studio/'},
});
export const HEAD = GET;
