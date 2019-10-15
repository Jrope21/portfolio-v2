<script>
    import ImageCard from '../components/PortfolioPageComponents/ImageCard.svelte';
    import ImageText from '../components/PortfolioPageComponents/ImageText.svelte';
    export let imgSrc, url, projectName, card;
</script>

<style>
    div.card-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 65%;
        max-width: 900px;
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
            width: 75%;
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

    div.projects-container {
        width: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }

</style>

<div class="card-container" bind:this={card} >
    <div class="image-container">
        <ImageCard imgSrc={imgSrc} url={url} />
    </div>
    <div class="text-container">
        <ImageText projectName={projectName} url={url} />
    </div>
</div>