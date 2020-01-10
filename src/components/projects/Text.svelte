<script>
import TextAnimation from '../helper-components/TextAnimation.svelte';

export let projectName, url, projectText, projectYear;
</script>

<style>

    a{
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
        color: #989898;
        font-weight: 300;
        font-style: italic;
    }
    h2 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0rem 5rem 0rem;
        font-size: 13rem;
        font-weight: 600;
        text-transform: capitalize;
        transition: all .2s ease-in-out;
        color: #3B3B3B;
        z-index: 2;
    }

    p{
        position: relative;
        z-index: 1;
        text-indent: 10px;
    }

    .year{
        
        content: '2019';
        position: absolute;
        font-weight: 900;
        opacity: .5;
        z-index: -5;
        left: -60px;
        top: 30px;
        transform: rotate(-90deg);
        color: #e6e7e8;
        font-size: 45px;
    }

    @media screen and (min-width: 40em) {
        h2 {
            margin-top: 0rem;
        }
    }

@media screen and (min-width: 64em){
    h2 {
        font-size: 23rem;
    }
    p{
        font-size: 18rem;
        line-height: 23px;
    }
    a{
        font-size: 14rem;
    }
}

</style>
<div>
    <h2>{projectName}</h2>
    <p>
        <span class='year'>{projectYear}</span>
        {@html projectText}
    </p>
    <a href="{url}">
        <TextAnimation text={`Project Details`} />
    </a>
</div>