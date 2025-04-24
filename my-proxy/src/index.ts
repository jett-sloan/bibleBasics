/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const pathname = url.pathname;

		if (pathname.startsWith("/bible")) {
			const query = new URL(request.url).searchParams;
			const chapterId = query.get("chapterId");

			if (!chapterId) {
				return new Response("Missing chapterId", { status: 400 });
			}

			const targetUrl = `https://api.scripture.api.bible/v1/bibles/${env.BIBLE_ID}/chapters/${chapterId}`;
			const res = await fetch(targetUrl, {
				headers: {
					"api-key": env.API_KEY,
				},
			});
			const data = await res.text(); // could be JSON or HTML
			return new Response(data, {
				headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
				status: res.status,
			});
		}

		if (pathname.startsWith("/chat")) {
			const body = await request.json();
			const res = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${env.OPEN_API}`,
				},
				body: JSON.stringify(body),
			});
			const data = await res.json();
			return Response.json(data);
		}

		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;

interface Env {
	API_KEY: string;
	OPEN_API: string;
	BIBLE_ID: string;
}
