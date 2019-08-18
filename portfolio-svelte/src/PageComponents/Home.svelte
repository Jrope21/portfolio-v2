<script>
	import NavContainer from '../Components/NavContainer.svelte';
    import StripeBackground from '../Components/StripeBackground.svelte';
    import HeroSection from '../Components/HeroSection.svelte';
    import Logo from '../Components/Logo.svelte';
//	export let name;
</script>

<style>
	section.one {
        width: 90vw;
        height: 100vh;
        margin: 0rem auto;
    }
</style>
<Logo />
<StripeBackground />
<NavContainer />
<section class="one center-all">
    <HeroSection />
</section>