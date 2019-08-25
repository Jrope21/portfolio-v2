<script>
    // global imports
	import NavContainer from '../Components/NavContainer.svelte';
    import FooterContainer from '../Components/FooterContainer.svelte';
    import StripeBackground from '../Components/StripeBackground.svelte';
    import Logo from '../Components/Logo.svelte';

    // section imports
    import HeroSection from '../Components/HeroSection.svelte';
    import SingleProjectSection from '../Components/SingleProjectSection.svelte';
    import MultiProjectSection from '../Components/MultiProjectSection.svelte';
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
        /* z-index: 0; */
    }
    section.two {
        width: 65vw;
        min-height: 900px;
        height: 80vh;

        margin: auto;
    }
    /* @media screen and (min-width: 40em){
        section.two {
            min-height: 500px;
        }
    } */
    section.three {
        width: 65vw;
        position:relative;
        /* min-height: 800px; */
        min-height: 100vh;
        /* background: rgba(34, 34, 34, 0.082); */
        margin: auto;
    }
    @media screen and (min-width: 40em){
        section.three {
            min-height: 600px;
            height: 55vh;
            width: 70vw;
        }
    }
    section.three::after{
        content: '';
        background: rgba(34, 34, 34, 0.082);
        position: absolute;
        /* top: 0; */
        width: 100vw;
        height: 100%;
        z-index: -2;
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
<section class="three center-all">
    <MultiProjectSection />
</section>
<FooterContainer />