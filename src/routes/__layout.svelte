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
	import { fade } from 'svelte/transition';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { user, currentPage } from '$store/store';

	export let username: string;
	export let path: string;
	$: currentPage.set(path);
	$: user.set(username);

	const transitionIn = { delay: 100, duration: 100 };
	const transitionOut = { duration: 75 };
</script>

<div class="page">
	<Header />
	{#key path}
		<main>
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
