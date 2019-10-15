<script>
 	// global imports
	// section imports
	import { fadeIn, fadeOut } from "../components/pageFade";
	import { onMount } from 'svelte';
    import HeroSection from '../components/HeroSection.svelte';
    import SingleProjectSection from '../components/SingleProjectSection.svelte';
    import MultiProjectSection from '../components/MultiProjectSection.svelte';
    import ProjectCardTextSection from '../components/ProjectCardTextSection.svelte';
    export let notHome = false;

	let heroSection;
    
    

    // let x = .25;
    let cards = [];

    // onMount(()=>{
    //     for(let i = 0; i < cards.length; i++){
    //         let fadeInOrder = () => {
                
    //             cards[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;
    //             x += .35;

    //         }
    //         fadeInOrder();
    //     }
    // })
    

    let portfolioCards = [
        {
            url: 'portfolio/university-park',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'University Park'
        },
        {
            url: 'portfolio/creative-revolt',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            url: 'portfolio/webuyuglyhouses',
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
        },
        {
            url: 'portfolio/anbtx',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'ANBTX'
        },
        {
            url: 'portfolio/advancial',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'Advancial Credit Union'
        },
        {
            url: 'portfolio/service-experts',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'Service Experts'
        },
    ]
</script>

<style>
		section.one {
        width: 90vw;
        height: 50vh;
        min-height: 600px;
        margin: 0rem auto;
    }
    section.two {
        width: 65vw;
        min-height: 820px;
        height: 80vh;
        position: relative;
        margin: auto;
    }
    section.two::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100%;
      
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
    @media screen and (min-width: 64em){
        section.three {
            min-height: 600px;
            height: 100%;
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
    section.test{
        height: 20vh;
        position: relative;
    }
    section.test::before {
        content: '';
        background: rgba(34, 34, 34, 0.082);
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100%;
      
    } 
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10% 0 10% 0;
        position: relative;
    }
    
    @media screen and (min-width: 64em){
        .container {
            flex-direction: row;
        }
    }
    div.projects-container {
        width: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<svelte:head>
	<title>Badass Portfolio Business</title>
</svelte:head>

<div in:fadeIn>
	<section bind:this={heroSection} class="one center-all">
		<HeroSection />
	</section>
    <div class="container">
        <div class="projects-container">
            {#each portfolioCards as card, index}
                <ProjectCardTextSection 
                    bind:this={cards[index]}
                    {index} 
                    imgSrc={card.imgSrc} 
                    url={card.url} 
                    projectName={card.projectName}
                />
            {/each}
        </div>
    </div>
	<!-- <section class="two center-all">
		<SingleProjectSection />
	</section>
    
	<section class="three center-all">
		<MultiProjectSection />
	</section> -->
</div>
