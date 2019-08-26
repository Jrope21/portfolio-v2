<script>
 	// global imports
	// section imports
	import { fadeIn, fadeOut } from "../components/pageFade";
	import { onMount } from 'svelte';
    import HeroSection from '../components/HeroSection.svelte';
    import SingleProjectSection from '../components/SingleProjectSection.svelte';
	import MultiProjectSection from '../components/MultiProjectSection.svelte';
	let heroSection;
	
	// onMount(()=>{
	// 	//ios fix
	// 	let windowHeight = window.innerHeight;
	// 	heroSection.style.height = `${windowHeight}px`
	// })
</script>

<style>
		section.one {
        width: 90vw;
        height: 100vh;
        margin: 0rem auto;
    }
    /* section.one::before {
        content: '';
        background: rgba(34, 34, 34, 0.082);
        position: absolute;
        top: 0;
        width: 100vw;
        min-height: 100vh;
      
    } */
    section.two {
        width: 65vw;
        min-height: 900px;
        height: 80vh;

        margin: auto;
    }
    section.three {
        width: 65vw;
        position:relative;
        min-height: 100vh;
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
        width: 100vw;
        height: 100%;
        z-index: -2;
    }
</style>

<svelte:head>
	<title>Badass Portfolio Business</title>
</svelte:head>

<div in:fadeIn>
	<section bind:this={heroSection} class="one center-all">
		<HeroSection />
	</section>
	<section class="two center-all">
		<SingleProjectSection />
	</section>
	<section class="three center-all">
		<MultiProjectSection />
	</section>
</div>
