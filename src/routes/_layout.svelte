<script>
	import { onMount } from 'svelte'
	import Navigation from '../components/global-components/navigation/Navigation.svelte';
	import Footer from '../components/global-components/Footer.svelte';
	// import FirstLoadPageAnimation from '../components/global-components/FirstLoadPageAnimation.svelte';

	export let segment;
	let visible = false;
	let finishedLoadPage = false;

	onMount(() => {
		visible = true;

		setTimeout(() => {
			finishedLoadPage = true;
		}, 4250)
	})
	
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

<Navigation segment={segment} loadComponents={finishedLoadPage} />

<div class="background"></div>

<main>
	<slot></slot>
</main>
<Footer />