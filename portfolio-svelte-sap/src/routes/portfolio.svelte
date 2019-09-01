<script>
    import ImageCard from '../components/PortfolioPageComponents/ImageCard.svelte';
    import ImageText from '../components/PortfolioPageComponents/ImageText.svelte';
    import PageHeader from '../components/IconComponents/PageHeader.svelte';
    import { fadeIn, fadeOut } from "../components/pageFade";
    import { onMount } from 'svelte';
    let x = .35;
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
            url: 'portfolio/university-park',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'University Park'
        },
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
        {
            url: '',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'Advancial Credit Union'
        },
        {
            url: '',
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
        padding: 10% 0 10% 0;
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
            /* width: 80%; */
        }
        div.card-container:nth-of-type(2n){
           flex-direction: row-reverse;
         }
        div.text-container {
            width: 40%;
        }
        div.image-container {
            width: 50%;
            justify-content: flex-start;
        }
        div.card-container:nth-of-type(2n) div.image-container{
            justify-content: flex-end;
        }
        /* div.image-container {
            width: 60%;
            padding: 10% auto;
        } */
        
    }
</style>

<svelte:head>
	<title>Badass Portfolio Business</title>
</svelte:head>

<section in:fadeIn>
    <PageHeader title={'Portfolio'} />
    {#each portfolioCards as card, index}
        <div class="card-container" bind:this={cards[index]} {index}>
            <div class="image-container">
                <ImageCard imgSrc={card.imgSrc} url={card.url} />
            </div>
            <div class="text-container">
                <ImageText projectName={card.projectName} url={card.url} />
            </div>
        </div>
    {/each}
</section>
