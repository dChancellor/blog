import type { Post } from '$types/post';

export const get = async (request): Promise<{ body: Post[] }> => {
	const allPostFiles = import.meta.glob('../**.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts: Post[] = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(2, -3);

			return {
				meta: metadata,
				path: postPath,
			};
		}),
	);

	const authorizedPosts = request.locals.user ? allPosts : filterAuthorizedPosts(allPosts);

	let filteredPosts = authorizedPosts;

	for (const [key, value] of request.url.searchParams) {
		switch (key) {
			case 'category':
				filteredPosts = filterPostsByCategory(filteredPosts, value);
				break;
			case 'tags':
				filteredPosts = filterPostsByTag(filteredPosts, value);
				break;
			default:
				break;
		}
	}

	const sortedPosts = filteredPosts.sort((a, b) => {
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf();
	});

	return {
		body: sortedPosts,
	};
};

const filterAuthorizedPosts = (posts): Post[] => posts.filter(({ path }) => !path.startsWith('/personal'));

const filterPostsByCategory = (posts, category): Post[] => posts.filter(({ path }) => path.startsWith(`/${category}`));

// TODO - Finish this
const filterPostsByTag = (posts, tags): Post[] => posts;
