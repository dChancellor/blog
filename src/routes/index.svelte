<script context="module" lang="ts">
	import type { Post } from '$types/post';
	export const load = async ({ fetch }) => {
		const response = await fetch(`/api/posts.json`);
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
	import Posts from '$pages/Pages.svelte';
	export let posts: Post[] | [];
</script>

<svelte:head>
	<title>Chancellor's Musings</title>
</svelte:head>

<Posts {posts} />
