<script>
import { onMount } from 'svelte'

import PageTitle from '../components/about/PageTitle.svelte';

import AboutMe from '../components/about/AboutMe.svelte';
import SkillsSection from '../components/about/Skills.svelte';
import Contact from '../components/about/Contact.svelte';

    let x = .25;
    let sections = [];

    onMount(()=>{
        for(let i = 0; i < sections.length; i++){
            let fadeInOrder = () => {
                
                sections[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;
                x += .35;

            }
            fadeInOrder();
        }
    })
</script>

<style>

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

    @media screen and (min-width: 40em){
        section{
            margin-bottom: 80px;
        }
    }

    @media screen and (min-width: 64em) {
        section{
            flex: 1;
        }
    }

	.container {
        width: 65%;
        margin-bottom: 40rem;		
        opacity: 0;
        max-width: 900px;
    }

    @media screen and (min-width: 40em){
        .container {
            width: 75%;
            margin-bottom: 50rem;
            margin-left: 100rem;
        }
    }
    
</style>

<svelte:head>
	<title>About</title>
</svelte:head>

<PageTitle title={'Joshua Roper'} />

<section>
	<div bind:this={sections[0]} class="container">
		<AboutMe />
	</div>
	<div bind:this={sections[1]} class="container">
		<SkillsSection />
	</div>
	<div bind:this={sections[2]} class="container">
		<Contact />
	</div>
</section>