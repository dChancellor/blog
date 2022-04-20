<!-- TODO - Update this once I get the routes taken care of  -->
<script context="module">
	export const load = ({ error, status }) => {
		return { props: { error, status } };
	};
</script>

<script lang="ts">
	export let status: number;
	export let error: Error;

	// TODO - Add suggested posts/routes here
</script>

<h2>{status}</h2>

<p>{error.message}</p>

<p>Maybe try one of these links instead?</p>

<ul>
	<li><a href="/">Home</a></li>
</ul>
