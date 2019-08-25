<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import Logo from '../components/Logo.svelte';
	export let segment;
</script>

<style>
</style>

<Logo />
<Nav {segment}/>

 <!-- <main> -->
	<slot></slot>
<!-- </main> -->

<Footer />