<script>
    import Image from './Image.svelte';
    import Text from './Text.svelte';    

    let portfolioCards = [
        {
            url: 'portfolio/university-park',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'University Park'
        },
        {
            url: 'portfolio/creative-revolt',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            url: 'portfolio/webuyuglyhouses',
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
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
        opacity: 1;
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
                    <Text projectName={card.projectName} url={card.url} />
                </div>
            </div>
        {/each}
    </div>
</section>