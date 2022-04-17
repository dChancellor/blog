<script context="module">
	export async function load({ session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/auth'
			};
		}
		return {
			props: {
				name: session.user
			}
		};
	}
</script>

<script>
	export let name;
</script>

<h1>Hi! You are registered as {name}.</h1>
