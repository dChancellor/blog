import type { AuthResponse, GitHubUser } from '$types/github';
import { authorizedUsers, githubAuth } from '../../dictionary/config';
import fetch from 'node-fetch';

export async function get({ locals, url }) {
	const githubCode = url.searchParams.get('code');
	const accessToken = await getAccessToken(githubCode);
	const user = await getUser(accessToken);
	if (!authorizedUsers.includes(user)) return { status: 302, headers: { location: '/' } };
	locals.user = user;
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [`user=${user || ''}; Path=/; HttpOnly`],
		},
	};
}

async function getAccessToken(githubCode: string): Promise<string | null> {
	const response = await fetch(githubAuth.tokenUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: githubAuth.clientID,
			client_secret: githubAuth.secret,
			code: githubCode,
		}),
	});
	return response
		.json()
		.then((json: AuthResponse) => json.access_token)
		.catch((error) => {
			console.log(error);
			return null;
		});
}

async function getUser(accessToken: string): Promise<string | null> {
	const response = await fetch(githubAuth.userUrl, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response
		.json()
		.then((json: GitHubUser) => json.login)
		.catch((error) => {
			console.log(error);
			return null;
		});
}
