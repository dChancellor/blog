export interface Post {
	metadata: Metadata;
	path: string;
	slug: string;
	fileName: string;
	default?: ProxyConstructor;
}

export interface Metadata {
	title: string;
	date: string;
	updated?: string;
	categories: string[];
	coverImage?: string;
	coverWidth?: number;
	coverHeight?: number;
	excerpt: string;
	secret: boolean;
}
