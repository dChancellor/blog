<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import { postsPerPage } from '$store/store';

	export const load = async ({ url, fetch }) => {
		let pPP = get(postsPerPage).toString();
		pPP = url.search ? `&postsPerPage=${pPP}` : `?postsPerPage=${pPP}`;
		const page = parseInt(url.searchParams.get('page')) || 1;
		const response = await fetch(`/api/posts.json${url.search}${pPP}`);
		const { posts = [], totalNumberOfPosts = 0 } = await response.json();

		return {
			status: response.status,
			props: {
				posts,
				page,
				totalNumberOfPosts,
			},
		};
	};
</script>

<script lang="ts">
	import type { Post } from '$types/post';
	import Posts from '$pages/Posts.svelte';
	import Pagination from '$components/Pagination.svelte';

	export let posts: Post[] | [];
	export let totalNumberOfPosts: number;
	export let page: number;
</script>

<svelte:head>
	<title>Chancellor's Musings</title>
</svelte:head>

<Pagination baseUrl={'/'} currentPage={page} {totalNumberOfPosts} />
<Posts {posts} />
