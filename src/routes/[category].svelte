<script context="module">
	import Posts from '$pages/Pages.svelte';
	const categories = ['dnd', 'personal', 'technology', 'maker'];
	const redirect = {
		status: 302,
		redirect: '/',
	};
	export const load = async ({ params, fetch, session }) => {
		const currentCategory = params.category;
		if (!categories.includes(currentCategory)) return redirect;
		if (!session?.user && currentCategory === 'personal') return redirect;
		const response = await fetch(`/api/posts.json?category=${currentCategory}`);
		const posts = await response.json();
		return {
			props: {
				posts,
			},
		};
	};
</script>

<script lang="ts">
	import type { Post } from '$types/post';
	export let posts: Post[] | [] = [];
</script>

<Posts {posts} />
<slot />
