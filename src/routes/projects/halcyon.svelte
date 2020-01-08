<script>
import PageTransition from '../PageTransition.svelte';
import PageTitle from '../../components/project-detail/PageTitle.svelte';
import Description from '../../components/project-detail/Description.svelte';
import Carousel from '../../components/project-detail/Carousel.svelte';
import Skills from '../../components/project-detail/Skills.svelte';


let STATE = {
    title: `Halcyon`,
    url: 'https://www.visithalcyon.com',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: ['React', 'React Static', 'JavaScript (ES6)', 'WordPress REST API', 'iShowtimes API', `Google API's`, 'AJAX / JSON', 'Bootstrap (React Bootstrap)', 'SCSS / SCSS', 'PostCSS', 'JSX (HTML WCAG 2.1)', 'PHP', 'WordPress', 'Adobe XD'],
    images: [
        {
            src: 'images/halcyon/home-cta.png',
            visible: true,
            key: 0,
        },
        {
            src: 'images/halcyon/home.png',
            visible: false,
            key: 1,
        },
        {
            src: 'images/halcyon/dining.png',
            visible: false,
            key: 2,
        },
        {
            src: 'images/halcyon/events.png',
            visible: false,
            key: 3,
        },
        {
            src: 'images/halcyon/spotlight.png',
            visible: false,
            key: 4,
        }, 
    ]
}


// {
//     url: 'https://www.visithalcyon.com',
//     imgSrc: 'images/halcyon-5.jpg',
//     alt: 'Thumbnail for the Halcyon mall website rebuild',
//     projectName: 'Halcyon',
//     projectYear: '2019',
//     projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
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
                    <Skills skills={STATE.skills} />
                </section>
                <section class="cta">
                    <a href={STATE.url} target="blank">Check The Site!</a>
                </section>
            </div>
        </div>
    </PageTransition>
</div>