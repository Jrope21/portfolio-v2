<script>
import PageTitle from '../components/project-detail/PageTitle.svelte';
import Description from '../components/project-detail/Description.svelte';
import Carousel from '../components/project-detail/Carousel.svelte';
import Skills from '../components/project-detail/Skills.svelte';

export let STATE;

</script>

<style lang="scss">
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
	<title>{STATE.metaTitle}</title>
</svelte:head>


<div class="project-detail">
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
                <a href={STATE.url} target="_blank">Check The Site!</a>
            </section>
        </div>
    </div>
</div>