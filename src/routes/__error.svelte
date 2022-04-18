<script context="module">
	export const load = ({ error, status }) => {
		return { props: { error, status } };
	};
</script>

<script lang="ts">
	import { categories, protectedRoutes } from '$dictionary/config';

	import { user } from '../store/store';

	export let status: number;
	export let error: Error;

	$: suggestedCategories = $user
		? categories
		: categories.filter((category: string) => !protectedRoutes.includes(category));
</script>

<h2>{status}</h2>

<p>{error.message}</p>

<p>Maybe try one of these links instead?</p>
<ul>
	<li><a href="/">Home</a></li>
	{#each suggestedCategories as category}
		<li><a href={`/${category}`}>{category}</a></li>
	{/each}
</ul>
