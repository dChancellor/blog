import type { RequestHandlerOutput } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { githubAuth } from '../../dictionary/config';

export async function get(): Promise<RequestHandlerOutput> {
	const sessionId: string = uuidv4();
	return {
		status: 302,
		headers: {
			location: `${githubAuth.authUrl}?client_id=${githubAuth.clientID}&state=${sessionId}`,
		},
	};
}
