<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	.text-container {
		margin: 90px auto 0px auto;
		max-width: 800px;
	}
	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin-bottom: 10px;
	}

	h2 {
		font-size: 1.6em;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="text-container container">
	<h1>OH NO!</h1>
	<h2>Looks like something went wrong :(</h2>
</div>


<!-- <p>{error.message}</p> -->

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
