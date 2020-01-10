<script>
    import { onMount } from 'svelte';  

    import Image from './Image.svelte';
    import Text from './Text.svelte';  

    let portfolioCards = [
        {
            url: '/projects/halcyon',
            imgSrc: 'images/halcyon-5.jpg',
            alt: 'Thumbnail for the Halcyon mall website rebuild',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
        },
        {
            url: '/projects/university-park',
            imgSrc: 'images/uptexas-thumb.jpg',
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'University Park',
            projectYear: '2019',
            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
        },
        {
            url: 'projects/creative-revolt',
            imgSrc: 'images/Jorden-Background-Gray.jpg',
            alt: 'Thumbnail for the Creative Revolt redesigned website',
            projectName: 'Creative Revolt',
            projectYear: '2018',
            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
        },
    ]
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';
    
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10% 0 10% 0;
        position: relative;
    }

    @media screen and (min-width: breakpoint(sm)){ 
        section {
            padding: 10% 0 10% 0;
        }
    }

    div.card-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 250px;
        margin-bottom: 05%;
    }

    div.image-container {
       display: flex;
       justify-content: center;
    }
    @media screen and (min-width: breakpoint(sm)){
        div.card-container {
            flex-direction: row;
            justify-content: space-around;
            width: 90%;
            margin-bottom: 8%;
        }
        div.card-container:nth-of-type(2n){
           flex-direction: row-reverse;
         }
        div.text-container {
            width: 35%;
        }
        div.image-container {
            width: 50%;
            justify-content: flex-start;
        }
        div.card-container:nth-of-type(2n) div.image-container{
            justify-content: flex-end;
        }

        
    }

    @media screen and (min-width: breakpoint(md)){
        div.card-container{
            width: 85%;
        }
    }

    @media screen and (min-width: 1363px){
        div.card-container{
            width: 80%;
        }
    }
    div.projects-container {
        width: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }

    h2 {
        display: flex;
        align-items: center;
        text-transform: uppercase;
        width: fit-content;
        margin-bottom: 10%;
        color: #3B3B3B;
        font-weight: 800;
    }

    h2::after {
        content: '';
        display: block;
        margin-left: 10px;
        width: 30px;
        border-bottom: 3px solid black;
    }


    @media screen and (min-width: breakpoint(md)){
        h2 {
            font-size: 23rem;
        }
    }
</style>

<section>
    <h2>Selected Works</h2>
    <div class="projects-container">
        {#each portfolioCards as card, index}
            <div class="card-container" {index}>
                <div class="image-container">
                    <Image imgSrc={card.imgSrc} url={card.url} alt={card.alt} />
                </div>
                <div class="text-container">
                    <Text projectName={card.projectName} url={card.url} projectText={card.projectText} projectYear={card.projectYear} />
                </div>
            </div>
        {/each}
    </div>
</section>