<script>
    import Hero from '../components/home-components/hero/Hero.svelte';
    import Projects from '../components/home-components/projects/Projects.svelte';
    import TextWithImageCta from '../components/home-components/text-with-image-cta/TextWithImageCta.svelte';
    import FirstLoadPageAnimation from '../components/global-components/FirstLoadPageAnimation.svelte';

    import DiRepairsThumb from '../images/thumbnails/di-thumb.jpg';
    import HalcyonThumb from '../images/thumbnails/halcyon-5-min.jpg';
    let portfolioCards = [
        {
            url: '/projects/halcyon',
            imgSrc: HalcyonThumb,
            alt: 'Thumbnail for the Halcyon mall website rebuild',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
        },
        {
            url: '/projects/di-repairs',
            imgSrc: DiRepairsThumb,
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'DI Repairs',
            projectYear: '2020',
            projectText: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`,
        },        
    ]
</script>

<style>

    .container {
        position: relative;
        margin-top: 90px;
    }

</style>

<svelte:head>
	<title>Home | Front End Developer - Joshua Roper</title>
</svelte:head>

    <!-- in:fly="{{ y: 20, duration: 500, delay: 500, }}"  -->
<!-- <FirstLoadPageAnimation /> -->

<div 
    class="container"
>
    <Hero />
    <TextWithImageCta />
    <Projects portfolioCards={portfolioCards} title={'Selected Works'} />
    
</div>