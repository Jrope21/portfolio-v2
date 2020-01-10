<script>
export let text, url;
import TextAnimation from '../helper-components/TextAnimation.svelte';
</script>

<style>

    div {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (min-width: 40em){
        div{
            flex-direction: row;
        }
    }

    p:nth-child(1){
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%
    }

    @media screen and (min-width: 40em){
        p:nth-child(1) {
            width: 20%;
        }
    }

    h3{
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        font-weight: 600;
        text-transform: uppercase;
    }

    @media screen and (min-width: 40em){
       h3 {
            width: 18%;
        }
    }
    @media screen and (min-width: 64em){
        h3 {
            font-size: 23rem;
            width: 20%;
        }
    }

    p:nth-child(2){
        width: 100%;
    }

    @media screen and (min-width: 40em){
        p:nth-child(2) {
            width: 65%;
        }
    }

    @media screen and (min-width: 64em){
        p:nth-child(2) {
            width: 50%;
            min-width: 450px;
        }
    }

    p {
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }

    @media screen and (min-width: 64em){
        p{
            font-size: 18rem;
            line-height: 23px;
        }
    }

    a{
        display: flex;
        align-items: center;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
        color: #989898;
        font-weight: 300;
        font-style: italic;
    }
    
    @media (min-width: 64em) {
        a {
            font-size: 14rem;
        }
    }

</style>

<div>
    <h3>
        Details
    </h3>
    <p>
        {@html text}
        <a target="_blank" href="{url}">
            <TextAnimation text={`View Website`} />
        </a>
    </p>
</div>
