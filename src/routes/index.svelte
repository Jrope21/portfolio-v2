<script>
    import Hero from '../components/home-components/hero/Hero.svelte';
    import Projects from '../components/home-components/projects/Projects.svelte';
    import TextWithImageCta from '../components/home-components/text-with-image-cta/TextWithImageCta.svelte';
    
    import GooseheadThumb from '../images/thumbnails/goosehead-thumb-png.png';
    import HalcyonThumb from '../images/thumbnails/halcyon-5-min.jpg';
    import TrinityThumb from '../images/thumbnails/trinity-thumb.png';

    let portfolioCards = [
        {
            url: '/projects/goosehead-insurance',
            imgSrc: GooseheadThumb,
            alt: 'Thumbnail for the Goosehead Insurance website rebuild',
            projectName: 'Goosehead Insurance',
            projectYear: '2021',
            projectText: `I was tasked with being the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong> for a multi-billion dollar insurance company. While building the site I placed an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, various forms, and other advanced modules.`
        },
        {
            url: '/projects/trinity-consultants',
            imgSrc: TrinityThumb,
            alt: 'Thumbnail for the Trinity Consultants website rebuild',
            projectName: 'Trinity Consultants',
            projectYear: '2020',
            projectText: `As the <strong>Lead React Developer</strong> on the ecommerce project, I was tasked with creating a multitude of dynamic templates for over 10,000 pages of content. The project included <strong>collaboration across multiple teams</strong>, and working with <strong>various advanced API’s,</strong> React, Redux, Stripe, etc...`
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

<div 
    class="container"
>
    <Hero />
    <TextWithImageCta />
    <Projects portfolioCards={portfolioCards} title={'Selected Works'} />
</div>