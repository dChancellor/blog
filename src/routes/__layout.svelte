<script context="module" lang="ts">
	import '$styles/global.css';

	export const load = async ({ url, session }) => {
		return {
			props: {
				username: session.user,
				path: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	import Header from '$components/Header.svelte';
	import { user, currentPage } from '../store/store';
	import { fade } from 'svelte/transition';
	import { prefetch } from '$app/navigation';
	import { categories } from '$dictionary/config';
	import { onMount } from 'svelte';
	import Footer from '$components/Footer.svelte';

	export let username: string;
	export let path: string;

	$: currentPage.set(path);
	$: user.set(username);

	const transitionIn = { delay: 100, duration: 100 };
	const transitionOut = { duration: 75 };

	onMount(() => {
		categories.forEach((category: string) => prefetch(`/${category}`));
	});
</script>

<div class="page">
	<Header />
	{#key path}
		<main tabindex="-1">
			<div in:fade={transitionIn} out:fade={transitionOut}>
				<slot />
			</div>
		</main>
	{/key}
	<Footer />
</div>

<style>
	.page {
		min-height: 100vh;
		max-width: 100vw;
	}
</style>
