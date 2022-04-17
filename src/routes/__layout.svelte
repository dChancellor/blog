<script context="module" lang="ts">
	import '$styles/global.css';

	export const load = async ({ url, session }) => {
		if (url.pathname.startsWith('/personal') && session.user != import.meta.env.VITE_USER) {
			return { redirect: '/', status: 302 };
		}
		return {
			props: {
				user: session.user,
				url: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	import Header from '$components/Header.svelte';
	import { fade } from 'svelte/transition';
	export let user: string;
	export let url: string;
</script>

<main>
	<Header {user} />
	{#key url}
		<div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<slot />
		</div>
	{/key}
</main>

<style>
</style>
