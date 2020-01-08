<script>
import PageTransition from '../PageTransition.svelte';
import PageTitle from '../../components/project-detail/PageTitle.svelte';
import Description from '../../components/project-detail/Description.svelte';
import Carousel from '../../components/project-detail/Carousel.svelte';
import Skills from '../../components/project-detail/Skills.svelte';


let STATE = {
    title: `Creative Revolt`,
    url: 'https://www.creativerevolt.com/',
    description: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
    skills: ['JavaScript', 'CSS', 'HTML', 'PHP', 'DiviBuilder', 'WordPress', 'SEO', 'Googe Analytics', 'Canva', 'Adobe XD', 'MailChimp'],
    images: [
        {
            src: 'images/creative-revolt/home.png',
            alt: `The landing page for Creative Revolt`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/creative-revolt/home-ctas.png',
            alt: `A call to action setup for Creative Revolt`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/creative-revolt/about.png',
            alt: `The about page for Creative Revolt`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/creative-revolt/about-cta.png',
            alt: `A call to action exculusively design for Creative Revolt`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/creative-revolt/writing-class.png',
            alt: `A page from creative revolt that introduces customers to her their courses`,
            visible: false,
            key: 4,
        },
    ]
}

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
        opacity: 1;
        transition: all .3s ease;
    }

    .cta a:hover {
        opacity: .75;
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
            <PageTitle title={'Creative Revolt'} />
            <div class="inner-container">
                <Carousel images={STATE.images}/>
                <section class="project-description">
                    <Description text={STATE.description} url={STATE.url} />  
                </section>
                <section class="skills-container">
                    <Skills skills={STATE.skills}/>
                </section>
                <section class="cta">
                    <a href={STATE.url} target="_blank">Check The Site!</a>
                </section>
            </div>
        </div>
    </PageTransition>
</div>