import type { RequestEvent } from '../../node_modules/@sveltejs/kit/types/internal';
import type { Post } from './post';

export interface CustomRequestHandler extends RequestEvent {
	locals: LocalProps;
}

interface LocalProps {
	user: string | null;
}

export interface PostsAPIResponse {
	status: number;
	body?: PostsBodyResponse;
	redirect?: string;
}

interface PostsBodyResponse {
	posts?: Post[];
	error?: string;
}

export interface Options {
	user?: string;
	category?: string;
}
