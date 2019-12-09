<script>
	import Navigation from '../components/navigation/Navigation.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import { onMount } from 'svelte'
</script>

<style>

	.background {
		background: url('../images/so-white.png');
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		z-index: -1;
	}

</style>

<Navigation />
<div class="background"></div>
<slot></slot>

<Footer />