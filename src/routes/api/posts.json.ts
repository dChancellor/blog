import type { CustomRequestHandler, PostsAPIResponse } from '$types/api';
import type { Post } from '$types/post';

export const get = async (request: CustomRequestHandler): Promise<PostsAPIResponse> => {
	try {
		const allPosts: Post[] = await Promise.all(
			Object.entries(import.meta.glob('/src/posts/**/*.md')).map(async ([path, resolver]) => {
				const { metadata } = await resolver();
				const fileName = path.split('/').pop().slice(0, -3);
				const pathRegex = new RegExp(`[^src/posts](.+)[^${fileName}.md]`, 'g');
				const postPath = path.match(pathRegex)[0];
				const slug = fileName.replaceAll(' ', '_') + '-' + postPath.replaceAll('/', '').slice(2);
				if (!metadata) throw Error(`ERROR - the post at ${path} is broken in some way`);
				return { metadata, path: postPath, slug, fileName };
			}),
		);

		const authorizedPosts = request.locals.user ? allPosts : filterProtectedPostsOut(allPosts);
		const sortedPosts = sortPosts(authorizedPosts);

		const { posts: filteredPosts, offset, postsPerPage } = applySearchParams(sortedPosts, request.url.searchParams);

		const totalNumberOfPosts = filteredPosts.length;

		const offSetPosts = filteredPosts.slice(offset, offset + postsPerPage);

		return {
			status: 200,
			body: {
				posts: offSetPosts,
				totalNumberOfPosts: totalNumberOfPosts,
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

const filterProtectedPostsOut = (posts: Post[]): Post[] => posts.filter((post) => !post.metadata.secret);

const filterPostsByCategory = (posts: Post[], category: string): Post[] => {
	let filteredPosts = posts;
	const categories = category.split(',');
	filteredPosts = filteredPosts.reduce((array, post) => {
		for (const category of categories) {
			if (post.metadata.categories.includes(category)) {
				array.push(post);
				break;
			}
		}
		return array;
	}, []);

	return filteredPosts;
};

const filterPostsByDate = (posts: Post[], date: string): Post[] => {
	let filteredPosts = posts;
	const [start, end] = date.split(',');
	const startDate = new Date(start).valueOf();
	const endDate = new Date(end).valueOf();
	filteredPosts = filteredPosts.filter((post) => {
		const postDate = new Date(post.metadata.date).valueOf();
		return postDate >= startDate && postDate <= endDate;
	});

	return filteredPosts;
};

const sortPosts = (posts: Post[]): Post[] => {
	return posts.sort((a, b) => {
		if (!b.metadata.date || !a.metadata.date) throw Error(`Either ${a} or ${b} does not have a date header`);
		return new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf();
	});
};

const applySearchParams = (
	posts: Post[],
	searchParams: URLSearchParams,
): { posts: Post[]; offset: number; postsPerPage: number } => {
	let filteredPosts = posts;
	let offset = 0;
	const postsPerPage = parseInt(searchParams.get('postsPerPage')) || 10;
	for (const [key, value] of searchParams) {
		switch (key) {
			case 'category': {
				filteredPosts = filterPostsByCategory(filteredPosts, value);
				break;
			}
			case 'page': {
				offset = parseInt(value) * postsPerPage - postsPerPage;
				break;
			}
			case 'date-range': {
				filteredPosts = filterPostsByDate(filteredPosts, value);
				break;
			}
			default:
				break;
		}
	}
	return { posts: filteredPosts, offset, postsPerPage };
};
