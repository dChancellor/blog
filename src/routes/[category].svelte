<script context="module">
	export const load = async ({ url, params }) => {
		const searchUrl = `/api/posts.json${url.search || '?'}category=${params.category}`;
		const response = await fetch(searchUrl);
		const { posts = [] } = await response.json();
		return {
			props: {
				posts,
				category: params.category,
			},
		};
	};
</script>

<script lang="ts">
	import { siteTitle } from '$dictionary/config';
	import Pages from '$pages/Posts.svelte';
	import type { Post } from '$types/post';

	export let category: string;
	export let posts: Post[];
</script>

<svelte:head>
	<title>{siteTitle} - {category.charAt(0).toUpperCase() + category.slice(1)}</title>
</svelte:head>

<h1>{category}</h1>

<Pages {posts} />
