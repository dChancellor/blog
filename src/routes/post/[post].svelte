<script context="module" lang="ts">
	import type { Post } from '$types/post';
	export const load = async ({ params }) => {
		try {
			const [slug, rawDate] = params.post.split('-');
			const [year, month] = rawDate.match(/.{1,2}/g);
			const fileName = slug.replaceAll('_', ' ');
			const post: Post = await import(`../../posts/20${year}/${month}/${fileName}.md`);

			return {
				props: {
					content: post.default,
					data: post.metadata,
				},
			};
		} catch (error) {
			return {
				status: 404,
				error: 'Could not find a post by that name.',
			};
		}
	};
</script>

<script lang="ts">
	import type { Metadata } from '$types/post';
	export let data: Metadata;
	export let content: ProxyConstructor;
	const { title } = data;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<svelte:component this={content} />
