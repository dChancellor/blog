import type { AuthResponse, GitHubUser } from '$types/github';
import fetch from 'node-fetch';
const tokenURL = 'https://github.com/login/oauth/access_token';
const userURL = 'https://api.github.com/user';

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_CLIENT_SECRET;

export async function get({ locals, url }) {
	const githubCode = url.searchParams.get('code');
	const accessToken = await getAccessToken(githubCode);
	const user = await getUser(accessToken);
	locals.user = user;
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [`user=${user || ''}; Path=/; HttpOnly`],
		},
	};
}

async function getAccessToken(githubCode): Promise<string | null> {
	const response = await fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: secret,
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

async function getUser(accessToken): Promise<string | null> {
	const response = await fetch(userURL, {
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
