import type { CustomRequestHandler, PostsAPIResponse } from '$types/api';
import type { Post } from '$types/post';
import { isProtectedRoute } from '../../helpers/helpers';

export const get = async (request: CustomRequestHandler): Promise<PostsAPIResponse> => {
	try {
		const allPosts: Post[] = await Promise.all(
			Object.entries(import.meta.glob('../**.md')).map(async ([path, resolver]) => {
				const { metadata: meta } = await resolver();
				const postPath = path.slice(2, -3);
				const slug = path.split('/').pop().slice(0, -3);
				return { meta, path: postPath, slug };
			}),
		);

		const authorizedPosts = request.locals.user ? allPosts : filterProtectedPostsOut(allPosts);
		const { posts: filteredPosts, postsPerPage, page } = applySearchParams(authorizedPosts, request.url.searchParams);
		const sortedPosts = sortPosts(filteredPosts);
		const paginatedPosts = sortedPosts.slice(page * postsPerPage - 10, page * postsPerPage - 1);

		return {
			status: 200,
			body: {
				posts: paginatedPosts,
			},
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: `There was an error fetching posts: ${error}`,
			},
		};
	}
};

const filterProtectedPostsOut = (posts: Post[]): Post[] => posts.filter(({ path }) => !isProtectedRoute(path));

const filterPostsByCategory = (posts: Post[], category: string): Post[] =>
	posts.filter(({ path }) => path.startsWith(`/${category}`));

// TODO - Finish this
// const filterPostsByTag = (posts: Post[], tags: string[]): Post[] => posts;

const sortPosts = (posts: Post[]): Post[] => {
	return posts.sort((a, b) => {
		if (!b.meta.date || !a.meta.date) {
			if (!b.meta.date) console.log(`ERROR - ${b} post might not have date meta data `);
			if (!a.meta.date) console.log(`ERROR - ${a} post might not have date meta data `);
			return 0;
		}
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf();
	});
};

const applySearchParams = (
	posts: Post[],
	searchParams: URLSearchParams,
): { posts: Post[]; postsPerPage: number; page: number } => {
	let filteredPosts = posts;
	let postsPerPage = 10;
	let page = 1;
	for (const [key, value] of searchParams) {
		switch (key) {
			case 'category':
				filteredPosts = filterPostsByCategory(filteredPosts, value);
				break;
			case 'tags':
				// filteredPosts = filterPostsByTag(filteredPosts, value);
				break;
			case 'postsPerPage':
				postsPerPage = parseInt(value);
				break;
			case 'page':
				page = parseInt(value);
				break;
			default:
				break;
		}
	}
	return { posts: filteredPosts, postsPerPage, page };
};
