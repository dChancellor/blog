<script lang="ts">
	import { postsPerPage } from '$store/store';

	export let baseUrl: string;
	export let currentPage: number;
	export let totalNumberOfPosts: number;
	$: totalNumberOfPages = Math.ceil(totalNumberOfPosts / $postsPerPage);
	$: arrayOfPages = [currentPage - 1, currentPage, currentPage + 1].filter(
		(pageNumber) => !(pageNumber < 1) && !(pageNumber > totalNumberOfPages),
	);
</script>

{#if totalNumberOfPages > 1}
	<nav>
		<ul>
			<li>
				<a class={currentPage - 1 === 0 && 'inactive'} href={`${baseUrl}?page=${currentPage - 1}`}>{`<`}</a>
			</li>
			{#if currentPage > 2}
				<li>
					<a href={`${baseUrl}?page=1`}>1</a>
				</li>
			{/if}

			{#if currentPage > 3}
				<li>...</li>
			{/if}

			{#each arrayOfPages as pageNumber}
				<li>
					<a class={pageNumber === currentPage && 'currentPage'} href={`${baseUrl}?page=${pageNumber}`}>{pageNumber}</a>
				</li>
			{/each}

			{#if currentPage < totalNumberOfPages - 2}
				<li>...</li>
			{/if}

			{#if currentPage < totalNumberOfPages - 1}
				<li>
					<a href={`${baseUrl}?page=${totalNumberOfPages}`}>{totalNumberOfPages}</a>
				</li>
			{/if}

			<li>
				<a class={currentPage + 1 > totalNumberOfPages && 'inactive'} href={`${baseUrl}?page=${currentPage + 1}`}
					>{`>`}</a
				>
			</li>
		</ul>
	</nav>
{/if}

<style>
	ul {
		list-style-type: none;
		display: flex;
		gap: 1.5rem;
	}
	a {
		color: inherit;
	}
	.currentPage {
		color: aqua;
	}
	.inactive {
		pointer-events: none;
	}
</style>
