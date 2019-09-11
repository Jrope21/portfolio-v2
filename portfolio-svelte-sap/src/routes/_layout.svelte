<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import Logo from '../components/Logo.svelte';
	
	export let segment;
	console.log(segment)
</script>

<style>
	.transition-wrapper{
		width: 100%;
		height: 100%;
	}
</style>

<Logo />

<Nav {segment}/>

<slot></slot>

<Footer />