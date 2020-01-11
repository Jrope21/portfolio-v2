<script>
    import { onMount } from 'svelte'
    import { fade, fly } from 'svelte/transition';

    import PageTitle from '../components/about/PageTitle.svelte';

    import AboutMe from '../components/about/AboutMe.svelte';
    import SkillsSection from '../components/about/Skills.svelte';
    import Contact from '../components/about/Contact.svelte';

</script>

<style lang="scss">
    @import '../styles/global.variables.scss';

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5% 0 0% 0;
        position: relative;
        color: gray;
        margin-bottom: 50px;
    }

	section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
    }

    @media screen and (min-width: breakpoint(sm)){
        section{
            margin-bottom: 80px;
        }
    }

    @media screen and (min-width: breakpoint(md)) {
        section{
            flex: 1;
        }
    }

	.content-container {
        width: 90%;
        margin-bottom: 40rem;		
        /* opacity: 0; */
        max-width: 900px;
    }

    @media screen and (min-width: breakpoint(sm)){
        .content-container {
            width: 75%;
            margin-bottom: 50rem;
            margin-left: 100rem;
        }
    }
    @media screen and (min-width: breakpoint(md)) {
        .content-container {
            width: 100%;
        }
    }
    
</style>

<svelte:head>
	<title>About | Front End Developer - Joshua Roper</title>
</svelte:head>

<div 
    in:fly="{{ x: -80, duration: 500, delay: 200, }}"
>
    <PageTitle title={'Joshua Roper'} />
</div>

<section>
    <div class="container">
        <div 
            in:fly="{{ x: -40, duration: 500, delay: 450, }}"
            class="content-container"
         >
            <AboutMe />
        </div> 
        <div 
            in:fly="{{ x: -40, duration: 500, delay: 650, }}"
            class="content-container"
        >
            <SkillsSection />
        </div>
        <div 
            in:fly="{{ x: -40, duration: 500, delay: 900, }}"
            class="content-container"
        >
            <Contact />
        </div>
    </div>
</section>