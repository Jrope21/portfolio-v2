<script>
    import { onMount } from 'svelte';  

    import Image from './Image.svelte';
    import Text from './Text.svelte';  

    // let x = .55;
    // let sections = [];

    // onMount(()=>{
    //     for(let i = 0; i < sections.length; i++){
    //         let fadeInOrder = () => {
                
    //             sections[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;
    //             x += .35;

    //         }
    //         fadeInOrder();
    //     }
    // })

    let portfolioCards = [
        {
            url: 'portfolio/university-park',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'University Park',
            projectYear: '2019',
            projectText: `I was tasked with being the sole developer on a complete website Front-End redesign. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, form verification, and several third party integrations / reworks.`,
        },
        {
            url: 'portfolio/creative-revolt',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt',
            projectYear: '2018',
            projectText: `This was a freelance project to rework the layout and tailor the feel of the website to her personal writing style. I revamped the color palette to better match her personality, adjusted her website for SEO, and created the landing page as well as multiple pages across the platform.`,
        },
        {
            url: 'portfolio/webuyuglyhouses',
            imgSrc: 'images/halcyon-5.jpg',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with multiple API’s, React Static, and developed clean code for other advanced React components.`
        },
        // {
        //     url: 'portfolio/anbtx',
        //     imgSrc: 'images/university-park-cta.jpeg',
        //     projectName: 'ANBTX'
        // },
        // {
        //     url: 'portfolio/advancial',
        //     imgSrc: 'images/university-park-cta.jpeg',
        //     projectName: 'Advancial Credit Union'
        // },
        // {
        //     url: 'portfolio/service-experts',
        //     imgSrc: 'images/university-park-cta.jpeg',
        //     projectName: 'Service Experts'
        // },
    ]
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10% 0 10% 0;
        position: relative;
    }

    @media screen and (min-width: 40em){
        section {
            padding: 10% 0 10% 0;
        }
    }

    div.card-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 250px;
        /* max-width: 900px; */
        margin-bottom: 05%;
        /* opacity: 0; */
    }

    div.image-container {
       display: flex;
       justify-content: center;
    }
    @media screen and (min-width: 40em){
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

    @media screen and (min-width: 64em){
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


    @media screen and (min-width: 64em){
        h2 {
            font-size: 23rem;
        }
    }
</style>

<svelte:head>
	<title>Badass Portfolio Business</title>
</svelte:head>


<section>
    <h2>Selected Works</h2>
    <div class="projects-container">
        {#each portfolioCards as card, index}
            <div class="card-container" {index}>
                <div class="image-container">
                    <Image imgSrc={card.imgSrc} url={card.url} />
                </div>
                <div class="text-container">
                    <Text projectName={card.projectName} url={card.url} projectText={card.projectText} projectYear={card.projectYear} />
                </div>
            </div>
        {/each}
    </div>
</section>