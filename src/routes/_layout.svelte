<script>
	import { onMount } from 'svelte'
	import Navigation from '../components/global-components/navigation/Navigation.svelte';
	import Footer from '../components/global-components/Footer.svelte';
	import FirstLoadPageAnimation from '../components/global-components/FirstLoadPageAnimation.svelte';

	export let segment;
	let visible = false;
	let finishedLoadPage = false;

	onMount(() => {
		visible = true;

		setTimeout(() => {
			finishedLoadPage = true;
		}, 4300)
	})
</script>

<style global lang="scss">
	@import '../styles/global.styles.scss';

</style>

<Navigation 
	segment={segment} 
	loadComponents={finishedLoadPage} 
/>

<FirstLoadPageAnimation />

<main>
	<slot></slot>
</main>
<Footer />