export interface AuthResponse {
	access_token: string;
	scope: string;
	token_type: string;
}

export interface GitHubUser {
	login: string;
}

export interface GithubOAuth {
	authUrl: string;
	tokenUrl: string;
	userUrl: string;
	clientID: string;
	secret: string;
}
