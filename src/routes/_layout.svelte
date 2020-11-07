<script>
	import { stores } from "@sapper/app";
	import { fade, fly } from 'svelte/transition';
	// import GoogleAnalytics from '../components/helper-components/GoogleAnalytics.svelte';
	import Navigation from '../components/global-components/navigation/Navigation.svelte';
	import Footer from '../components/global-components/Footer.svelte';

	export let segment;
	// let ga_id = 'UA-89058156-2';
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

<!-- <GoogleAnalytics {stores} id={ga_id} /> -->
<Navigation segment={segment} />
<div class="background"></div>
<main>
	<slot></slot>
</main>
<Footer />