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
			<h2>
				<a href={post.path}>
					{post.meta.title ? post.meta.title : 'Untitled'}
				</a>
			</h2>
			Published {post.meta.date}
		</li>
	{/each}
</ul>
