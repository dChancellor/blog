export interface AuthResponse {
	access_token: string;
	scope: string;
	token_type: string;
}

export interface GitHubUser {
	login: string;
}
