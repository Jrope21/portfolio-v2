<script>
import PageTransition from '../PageTransition.svelte';
import PageTitle from '../../components/project-detail/PageTitle.svelte';
import Description from '../../components/project-detail/Description.svelte';
import Carousel from '../../components/project-detail/Carousel.svelte';
import Skills from '../../components/project-detail/Skills.svelte';

let STATE = {
    title: `University Park`,
    url: 'https://www.uptexas.org',
    description: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
    skills: ['Javascript (ES6+)', 'jQuery', 'API Integration', 'AJAX / JSON', 'SASS / SCSS', 'CSS', 'Foundation', 'HTML (WCAG 2.1)', 'Adobe Illustrator', 'SEO', 'Kentico (CMS)', 'BitBucket'],
    images: [
        {
            src: 'images/university-park/home.png',
            visible: true,
            key: 0,
        },
        
        {
            src: 'images/university-park/library.png',
            visible: false,
            key: 1,
        },
        {
            src: 'images/university-park/home-video.png',
            visible: false,
            key: 2,
        },
        {
            src: 'images/university-park/form.png',
            visible: false,
            key: 3,
        },
        {
            src: 'images/university-park/newsletter.png',
            visible: false,
            key: 4,
        },
    ]
}

// {
//     url: 'https://www.uptexas.org',
//     imgSrc: 'images/uptexas-thumb.jpg',
//     alt: 'Thumbnail for the City of University Park complete Front End website redesign',
//     projectName: 'University Park',
//     projectYear: '2019',
//     projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
// },
</script>

<style>
    @media screen and (min-width: 40em){
        .inner-container {
            width: 90%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 40em){
        .project-description {
            padding-left: 12%;
            margin: 50rem 0;
        }
    }

    @media (min-width: 64em) {
        .project-description {
            margin: 60rem 0;
        }
    }
    .cta {
        margin: 60rem 0;
    }

    @media (min-width: 40em) {
        .cta {
            margin: 75rem 0;
            margin-left: 15%;
        }
    }

    @media (min-width: 64em) {
        .cta {
            margin: 85rem 0;
            margin-left: 17%;
        }
    }

    .cta a {
        color: #58595b;
        font-size: 18px;
        font-weight: 600;
        font-style: italic;
    }

    @media (min-width: 64em) {
        .cta a {
            font-size: 26px;
            font-weight: 800;
        }
        
    }

    .skills-container {
        margin: 40rem 0;
    }

    @media (min-width: 40em) {
        section {
            padding-left: 12%;
        }
    }
    .project-detail {
        margin-bottom: 60px
    }
</style>

<svelte:head>
	<title>Creative Revolt | Front End Developer - Joshua Roper</title>
</svelte:head>


<div class="project-detail">
    <PageTransition>
        <div class="container">
            <PageTitle title={STATE.title} />
            <div class="inner-container">
                <Carousel images={STATE.images}/>
                <section class="project-description">
                    <Description text={STATE.description} url={STATE.url} />    
                </section>
                <section class="skills-container">
                    <Skills skills={STATE.skills}/>
                </section>
                <section class="cta">
                    <a href={STATE.url} target="blank">Check The Site!</a>
                </section>
            </div>
        </div>
    </PageTransition>
</div>