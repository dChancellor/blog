import type { CustomRequestHandler } from '$types/api';
import { parse } from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies.user;
	const response = await resolve(event);
	response.headers['set-cookie'] = `user=${event.locals.user || ''}; Path=/; HttpOnly`;
	return response;
}

export async function getSession(request: CustomRequestHandler) {
	return {
		user: request.locals.user,
	};
}
