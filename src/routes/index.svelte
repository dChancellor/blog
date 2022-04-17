<script context="module" lang="ts">
	import type { Post } from '$types/post';
	export const load = async ({ fetch }) => {
		const posts = await fetch(`/api/posts.json?`);
		const allPosts: Post[] = await posts.json();
		return {
			props: {
				posts: allPosts,
			},
		};
	};
</script>

<script lang="ts">
	import Posts from '$pages/Pages.svelte';
	export let posts: Post[];
</script>

<svelte:head>
	<title>Chancellor's Musings</title>
</svelte:head>

<Posts {posts} />
