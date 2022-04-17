<script lang="ts">
	// For styling code blocks
	import '$styles/synthwave84.css';
	import '$styles/markdown.css';
	import { onMount } from 'svelte';

	export let title = 'Untitled';
	export let date = 'Unknown Date';

	onMount(() => {
		let headings = document.querySelectorAll('.post .icon-link');
		headings.forEach((heading) => {
			heading.addEventListener('click', () => {
				//@ts-ignore
				navigator.clipboard.writeText(heading.parentElement.href);
			});
		});
	});
</script>

<svelte:head>
	<title>Chancellor's Musings - {title}</title>
</svelte:head>

<h1>{title}</h1>
<p>Published: {date}</p>

<div class="post">
	<slot />
</div>

<style>
	.post {
		margin: 5rem;
	}
</style>
