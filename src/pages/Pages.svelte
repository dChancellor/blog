<script lang="ts">
	import type { Post } from '$types/post';
	export let posts: Post[];
</script>

<ul>
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
