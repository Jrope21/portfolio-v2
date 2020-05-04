<script>
	import { fade, fly } from 'svelte/transition'
	import GoogleAnalytics from '../components/helper-components/GoogleAnalytics.svelte';
	import Navigation from '../components/navigation/Navigation.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import { onMount } from 'svelte'

	export let segment;
</script>

<style global lang="scss">
	@import '../styles/global.styles.scss';
	.background {
		background: url('../background-images/so-white.png');
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
	}

</style>

<GoogleAnalytics />
<Navigation segment={segment} />
<div class="background"></div>
<main>
	<slot ></slot>
</main>
<Footer />