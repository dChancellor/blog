<script context="module">
	import { get } from 'svelte/store';
	import { postsPerPage } from '$store/store';

	export const load = async ({ fetch, url, params }) => {
		let pPP = get(postsPerPage).toString();
		const page = parseInt(url.searchParams.get('page')) || 1;
		const searchUrl = `/api/posts.json?category=${params.category}&postsPerPage=${pPP}&${url.search.slice(1)}`;
		console.log(searchUrl);
		const response = await fetch(searchUrl);
		const { posts = [], totalNumberOfPosts = 0 } = await response.json();
		return {
			props: {
				posts,
				page,
				totalNumberOfPosts,
				category: params.category,
			},
		};
	};
</script>

<script lang="ts">
	import Pagination from '$components/Pagination.svelte';
	import { siteTitle } from '$dictionary/config';
	import Pages from '$pages/Posts.svelte';
	import type { Post } from '$types/post';

	export let category: string;
	export let posts: Post[];
	export let page: number;
	export let totalNumberOfPosts: number;
</script>

<svelte:head>
	<title>{siteTitle} - {category.charAt(0).toUpperCase() + category.slice(1)}</title>
</svelte:head>

<h1>{category}</h1>

<Pagination baseUrl={`/${category}`} currentPage={page} {totalNumberOfPosts} />
<Pages {posts} />
