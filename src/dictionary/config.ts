import type { GithubOAuth } from '../types/github';

export const authorizedUsers: string[] = import.meta.env.VITE_USERS.split('&');

export const githubAuth: GithubOAuth = {
	authUrl: 'https://github.com/login/oauth/authorize',
	tokenUrl: 'https://github.com/login/oauth/access_token',
	userUrl: 'https://api.github.com/user',
	clientID: import.meta.env.VITE_CLIENT_ID,
	secret: import.meta.env.VITE_CLIENT_SECRET,
};

export const siteTitle = "Chancellor's Musings";
export const siteLink = 'https://github.com/dChancellor/blog';
export const siteAuthor = 'Derek Chancellor';
