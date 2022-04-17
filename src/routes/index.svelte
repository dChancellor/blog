<script context="module" lang="ts">
	import type { Post } from '$types/post';
	import '$styles/global.css';
	export const load = async ({ fetch, session }) => {
		const posts = await fetch(`/api/posts.json?`);
		const allPosts: Post[] = await posts.json();
		const authorizedPosts = session.user ? allPosts : allPosts.filter((post) => !post.path.startsWith('/personal'));
		return {
			props: {
				posts: authorizedPosts
			}
		};
	};
</script>

<script lang="ts">
	import Posts from '$pages/Pages.svelte';
	export let posts: Post[];
</script>

<Posts {posts} />
