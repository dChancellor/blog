<script context="module" lang="ts">
	export const load = async ({ url, fetch }) => {
		const response = await fetch(`/api/posts.json${url.search}`);
		const { posts = [] } = await response.json();
		return {
			status: response.status,
			props: {
				posts,
			},
		};
	};
</script>

<script lang="ts">
	import type { Post } from '$types/post';
	import Posts from '$pages/Posts.svelte';
	export let posts: Post[] | [];
</script>

<svelte:head>
	<title>Chancellor's Musings</title>
</svelte:head>

<Posts {posts} />
