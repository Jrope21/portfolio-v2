<script>
	import Navigation from '../components/navigation/Navigation.svelte';
	import Footer from '../components/Footer.svelte';
	import { onMount } from 'svelte'
</script>

<style>

</style>

<Navigation />

<slot></slot>

<Footer />