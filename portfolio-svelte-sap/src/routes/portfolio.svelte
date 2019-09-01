<script>
    import ImageCard from '../components/PortfolioPageComponents/ImageCard.svelte';
    import ImageText from '../components/PortfolioPageComponents/ImageText.svelte';
    import { fadeIn, fadeOut } from "../components/pageFade";
    import { onMount } from 'svelte';
    let x = .3;
    let cards = [];

    onMount(()=>{
        for(let i = 0; i < cards.length; i++){
            let fadeInOrder = () => {
                
                cards[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;
                x += .35;

            }
            fadeInOrder();
        }
    })
    

    let portfolioCards = [
        {
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'University Park'
        },
        {
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
        },
        {
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'ANBTX'
        },
        {
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'Advancial Credit Union'
        },
        {
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'Service Experts'
        },
    ]
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10% 0;
        position: relative;
    }
    section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(34, 34, 34, 0.082);
        z-index: -1;
    }
    div.card-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 65%;
        max-width: 800px;
        margin-bottom: 05%;
        opacity: 0;
    }
    div.image-container {
       display: flex;
       justify-content: center;
    }
    @media screen and (min-width: 40em){
        div.card-container {
            flex-direction: row;
            justify-content: space-around;
        }
        div.card-container:nth-of-type(2n){
           flex-direction: row-reverse;
         }
        div.text-container {
            width: 50%;
        }
        div.image-container {
            width: 50%;
            justify-content: flex-start;
        }
        div.card-container:nth-of-type(2n) div.image-container{
            justify-content: flex-end;
        }
        div.image-container {
            width: 50%;
            padding: 10% auto;
        }
        
    }
</style>

<svelte:head>
	<title>Badass Portfolio Business</title>
</svelte:head>

<section in:fadeIn>
    {#each portfolioCards as card, index}
        <div class="card-container" bind:this={cards[index]} {index}>
            <div class="image-container">
                <ImageCard imgSrc={card.imgSrc}  />
            </div>
            <div class="text-container">
                <ImageText projectName={card.projectName}/>
            </div>
        </div>
    {/each}
</section>
