import type { RequestHandlerOutput } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

const ghAuthURL = 'https://github.com/login/oauth/authorize';
const clientId: string = import.meta.env.VITE_CLIENT_ID;

export async function get(): Promise<RequestHandlerOutput> {
	const sessionId: string = uuidv4();
	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${clientId}&state=${sessionId}`,
		},
	};
}
