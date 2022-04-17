import type { RequestHandlerOutput } from '@sveltejs/kit';

export async function get(req): Promise<RequestHandlerOutput> {
	req.locals.user = null;
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': `user=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`,
		},
	};
}
