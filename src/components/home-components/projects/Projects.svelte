<script>
    import { onMount } from 'svelte';  

    import Image from './Image.svelte';
    import Text from './Text.svelte';  

    export let portfolioCards, title;
    
</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';
    
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 10% 0 10% 0;
        position: relative;
    }

    // @media screen and (min-width: breakpoint(sm)){ 
    //     section {
    //         padding: 10% 0 10% 0;
    //     }
    // }

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
        color: color(primary);
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
    {#if title}
        <h2>{title}</h2>
    {/if}
    
    <div class="projects-container">
        {#each portfolioCards as card, index}
            <div class="card-container" {index}>
                <div class="image-container">
                    <Image 
                        imgSrc={card.imgSrc} 
                        imgSrcSmall={card.imgSrcSmall}
                        url={card.url} 
                        imgAlt={card.alt} 
                    />
                </div>
                <div class="text-container">
                    <Text projectName={card.projectName} url={card.url} projectText={card.projectText} projectYear={card.projectYear} />
                </div>
            </div>
        {/each}
    </div>
</section>