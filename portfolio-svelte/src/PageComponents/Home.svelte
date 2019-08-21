<script>
	import NavContainer from '../Components/NavContainer.svelte';
    import StripeBackground from '../Components/StripeBackground.svelte';
    import Logo from '../Components/Logo.svelte';

    // section imports
    import HeroSection from '../Components/HeroSection.svelte';
    import SingleProjectSection from '../Components/SingleProjectSection.svelte';
//	export let name;
</script>

<style>
	section.one {
        width: 90vw;
        height: 100vh;
        margin: 0rem auto;
    }
    section.one::before {
        content: '';
        background: rgba(34, 34, 34, 0.082);
        position: absolute;
        top: 0;
        width: 100vw;
        min-height: 100vh;
        z-index: 2;
    }
    section.two {
        width: 65vw;
        min-height: 800px;
        height: 100vh;

        margin: auto;
    }
    
</style>
<Logo />
<!-- <StripeBackground /> -->
<NavContainer />
<section class="one center-all">
    <HeroSection />
</section>
<section class="two center-all">
    <SingleProjectSection />
</section>