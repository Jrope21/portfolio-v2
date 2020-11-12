<script>
    import Projects from '../components/home-components/projects/Projects.svelte';
    import PageTitle from '../components/project-detail-components/PageTitle.svelte';

    import DiRepairsThumb from '../images/thumbnails/di-thumb.jpg';
    import DiRepairsThumbSmall from '../images/thumbnails/di-thumb-small.jpg';
    import HalcyonThumb from '../images/thumbnails/halcyon-5-min.jpg';
    import HalcyonThumbSmall from '../images/thumbnails/halcyon-5-small.jpg';
    import StallionThumb from '../images/thumbnails/stallion-thumb-a-min.jpg';
    import StallionThumbSmall from '../images/thumbnails/stallion-thumb-a-min-small.jpg';
    import UniversityParkThumb from '../images/thumbnails/uptexas-thumb-min.jpg';
    import UniversityParkThumbSmall from '../images/thumbnails/uptexas-thumb-min-small.jpg';
    import CreativeRevoltThumb from '../images/thumbnails/Jorden-Background-Gray-min.jpg';
    import CreativeRevoltThumbSmall from '../images/thumbnails/Jorden-Background-Gray-min-small.jpg';

    let portfolioCards = [
        {
            url: '/projects/halcyon',
            imgSrc: HalcyonThumb,
            imgSrcSmall: HalcyonThumbSmall,
            alt: 'Thumbnail for the Halcyon mall website rebuild',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
        },
        {
            url: '/projects/di-repairs',
            imgSrc: DiRepairsThumb,
            imgSrcSmall: DiRepairsThumbSmall,
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'DI Repairs',
            projectYear: '2020',
            projectText: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`,
        },
        {
            url: 'projects/stallion',
            imgSrc: StallionThumb,
            imgSrcSmall: StallionThumbSmall,
            alt: 'Thumbnail for the Stallion complete website rebuild',
            projectName: 'Stallion',
            projectYear: '2019',
            projectText: `As the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong>, I worked towards envisioning a website that would match their innovative Stallion attitude. The project was built with an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, form verification, and other advanced modules.`,
        },
        {
            url: '/projects/university-park',
            imgSrc: UniversityParkThumb,
            imgSrcSmall: UniversityParkThumbSmall,
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'University Park',
            projectYear: '2019',
            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
        },
        {
            url: 'projects/creative-revolt',
            imgSrc: CreativeRevoltThumb,
            imgSrcSmall: CreativeRevoltThumbSmall,
            alt: 'Thumbnail for the Creative Revolt redesigned website',
            projectName: 'Creative Revolt',
            projectYear: '2018',
            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
        },
        
    ]
</script>

<style>

    .container {
        position: relative;
    }

</style>

<svelte:head>
	<title>Projects | Front End Developer - Joshua Roper</title>
</svelte:head>



<div 
    class="container" 
>
    <PageTitle title={'Projects'} />
    <Projects portfolioCards={portfolioCards} />
</div>