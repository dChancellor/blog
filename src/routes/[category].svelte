<script context="module">
	import Posts from '$pages/Pages.svelte';
	import { generateFetchRoute } from '$helpers/helpers';
	import { categories, protectedRoutes, siteTitle } from '$dictionary/config';

	export const load = async ({ params, fetch, session }) => {
		const options = {
			category: params.category,
		};
		const userNotAuthorized = !session.user && protectedRoutes.includes(options.category);
		if (!categories.includes(options.category) || userNotAuthorized)
			return {
				status: 404,
				error: `Sorry, the category "${options.category}" was not found.`,
			};
		const url = generateFetchRoute('/api/posts.json?', options);
		const response = await fetch(url);
		const { posts = [] } = await response.json();
		return {
			status: response.status,
			props: {
				currentCategory: params.category,
				posts,
			},
		};
	};
</script>

<script lang="ts">
	import type { Post } from '$types/post';
	export let posts: Post[] | [];
	export let currentCategory: string;
</script>

<svelte:head>
	<title>{siteTitle} - {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}</title>
</svelte:head>

<Posts {posts} />
