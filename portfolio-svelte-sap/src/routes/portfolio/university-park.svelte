<script>
import PageHeader from '../../components/IconComponents/PageHeader.svelte';
import { fadeIn, fadeOut } from '../../components/PageFade';
import { onMount } from 'svelte';

import SidePageHeroSection from '../../components/SidePageHeroSection.svelte';
import SidePageTextLgImageSection from "../../components/SidePageTextLgImageSection.svelte";
import SidePageResponsiveImgSection from '../../components/SidePageResponsiveImgSection.svelte';
import SidePageSkillsSection from '../../components/SidePageSkillsSection.svelte';

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
        padding: 10% 0 0% 0;
        position: relative;
        color: gray;
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
</style>

<PageHeader sidePage={'side-page'} title={'University Park'} />
<section in:fadeIn>
    
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
</section>