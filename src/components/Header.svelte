<script lang="ts">
	import { user } from '../store/store';
</script>

<header>
	<a href="/">Home</a>
	<a href="/technology">Tech</a>
	<a href="/technology?category=test">SP</a>
	{#if $user}
		<h2>Welcome {$user}</h2>
		<form action="/auth/logout">
			<button>Logout</button>
		</form>
	{:else}
		<form action="/auth/login">
			<button>Login using Github</button>
		</form>
	{/if}
</header>

<style>
	header {
		width: 100%;
		height: 50px;
		background-color: grey;
		display: flex;
		flex-flow: row nowrap;
		gap: 5rem;
		justify-content: center;
		align-items: center;
	}
</style>
