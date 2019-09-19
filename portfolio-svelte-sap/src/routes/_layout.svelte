<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import Logo from '../components/Logo.svelte';
	import { onMount } from 'svelte'
	export let segment;

	let notHome;

	onMount(()=>{
		if(window.location.pathname === '/'){
			notHome = false;
		} else {
			notHome = true;
		}
	})
</script>

<style>
	.transition-wrapper{
		width: 100%;
		height: 100%;
	}
</style>

<Logo notHome={notHome} />

<Nav {segment}/>

<slot></slot>

<Footer />