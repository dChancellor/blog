export interface Post {
	meta: Meta;
	path: string;
	slug: string;
}

export interface Meta {
	title: string;
	date: string;
	coverImage: string;
	coverWidth: number;
	coverHeight: number;
}
