<script context="module" lang="ts">
	export const load = async ({ url, session }) => {
		if (url.pathname === '/personal' && session.user != import.meta.env.VITE_USER) {
			return { redirect: '/', status: 302 };
		}
		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
	import Header from '$components/Header.svelte';
	export let user: string;
</script>

<Header {user} />
<slot />
