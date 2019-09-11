<script>
import PageHeader from '../../components/IconComponents/PageHeader.svelte';
import { fadeIn, fadeOut } from '../../components/PageFade';
import { onMount } from 'svelte';

import SidePageHeroSection from '../../components/SidePageHeroSection.svelte';
import SidePageTextLgImageSection from "../../components/SidePageTextLgImageSection.svelte";
import SidePageResponsiveImgSection from '../../components/SidePageResponsiveImgSection.svelte';
import SidePageSkillsSection from '../../components/SidePageSkillsSection.svelte';

//side bar imports
import SideProjectCard from '../../components/IconComponents/SideProjectCard.svelte';
import LeadForm from '../../components/IconComponents/LeadForm.svelte';
import Button from '../../components/IconComponents/Button.svelte';

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


    let projects = [
        {
            url: '',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            url: '',
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
        },
        {
            url: '',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'ANBTX'
        },
        // {
        //     url: '',
        //     imgSrc: 'images/university-park-cta.jpeg',
        //     projectName: 'Advancial Credit Union'
        // },
        // {
        //     url: '',
        //     imgSrc: 'images/university-park-cta.jpeg',
        //     projectName: 'Service Experts'
        // },
    ]
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        padding: 8% 0 0% 0;
        position: relative;
        color: gray;
    }
    @media screen and (min-width: 64em) {
        section{
            flex-direction: row;
            justify-content: center;
            align-items: unset;
        }
    }

    section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        /* background: rgba(34, 34, 34, 0.082); */
        background: rgba(34, 34, 34, 0.022);
        z-index: -1;
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
            margin-bottom: 100rem;
        }
    }
    a {
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
    }


    div.projects-container {
        width: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }
    div.lead-form-container {
        
        position: relative;
        width: 100vw;
        height: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }

    div.lead-form-container::before{
       
        content: '';
        position:absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(34, 34, 34, .1);
        z-index: -1;
        /* padding-bottom: 10%; */
    
    }

    h3 {
        margin-top: 40rem;
    }

    @media screen and (min-width: 40em){
    
        
    }

    @media screen and (min-width: 64em) {
        div.projects-container {
            width: 65%;
        }
        div.lead-form-container {
            position: unset;
            width: 35%;
            display: flex;
        }
        div.lead-form-container::before{
            width: 35%;
        }
        h3 {
            margin-top: 0rem;
        }
    }

    div.side-bar-contiainer{
        width: 17vw;
        height: 100%;
        min-height: fit-content;
    }

    h3::after {
        content: '';
        display: block;
        width: 100%;
        height: 7px;
        margin: 5px 0px 18px 0px;
        background: lightgray;
    }
</style>

<PageHeader sidePage={'side-page'} title={'University Park'} />
<section in:fadeIn>
    <div class="projects-container">
        <div bind:this={sections[0]} class="container">
            <SidePageHeroSection />
        </div>
        <div bind:this={sections[1]} class="container">
            <SidePageTextLgImageSection />
        </div>
        <div bind:this={sections[2]} class="container">
            <SidePageResponsiveImgSection />
        </div>
        <div bind:this={sections[3]} class="container">
            <SidePageSkillsSection />
        </div>
    </div>
    <div class="lead-form-container">
        <!-- <LeadForm /> -->
        <div class="side-bar-container">
            <h3>Projects</h3>
            {#each projects as project}
                <SideProjectCard imgSrc={project.imgSrc} projectName={project.projectName} />
            {/each}
            <Button text={'Explore More Works'} />
        </div>
    </div>
</section>