<script lang="ts">
	import type { Post } from '$types/post';
	export let posts: Post[];
</script>

<ul>
	{#if posts.length === 0}
		<h1>No posts found for this category</h1>
	{/if}
	{#each posts as post}
		<li>
			<article>
				<img
					src={`/images/${post.path}/${post.metadata.coverImage}`}
					alt=""
					width={post.metadata.coverWidth}
					height={post.metadata.coverHeight}
					style="aspect-ratio: {post.metadata.coverWidth} / {post.metadata.coverHeight}"
				/>
				<h2>
					<a sveltekit:prefetch href={`/post/${post.slug}`}>
						{post.metadata.title ? post.metadata.title : 'Untitled'}
					</a>
				</h2>
				Published {post.metadata.date}
			</article>
		</li>
	{/each}
</ul>

<style>
	ul {
		max-width: 60%;
		margin: auto;
		margin-top: 5rem;
		list-style-type: none;
	}
	img {
		width: 100%;
		height: auto;
		max-width: 100%;
	}
	li {
		margin-top: 2rem;
	}
</style>
