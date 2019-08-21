<script>
import { onMount } from 'svelte';
import FooterSocial from './FooterSocial.svelte';

let socialCtas = [
    {
        content: 'Connect with me on LinkedIn',
        url: ''
    },
    {
        content: 'Follow me on GitHub',
        url: ''
    }
]

let footer;

onMount(() => {
    //nav turns sticky above footer
    let nav = document.getElementsByTagName('aside');
    let footerTopScrollPos = footer.offsetTop - footer.offsetHeight;
    let footerHeight = footer.offsetHeight;
    window.addEventListener("scroll", () => {
        let footerScrollMatch = window.pageYOffset + window.innerHeight - footerHeight;
        let stickyMarginCalc = document.body.offsetHeight - (window.pageYOffset + window.innerHeight + footerHeight);
        let stickyMarginAbs = Math.abs(stickyMarginCalc);
        if(footerScrollMatch >= footerTopScrollPos){
            nav[0].style.marginBottom = `${stickyMarginAbs}px`;
        } else {
            nav[0].style.marginBottom = '0px';
        }
    })
})
</script>

<style>
    footer {
        display: flex;
        min-height: 30vh;
        flex-wrap: wrap;
        font-size: 10rem;
    }
    div{
        flex: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    div.cta{
        
    }
</style>

<footer bind:this={footer}>
    <div class="logo">
        
    </div>
    <div class="cta">
        {#each socialCtas as socialCta}
            <FooterSocial content={socialCta.content} url={socialCta.url}/>
        {/each}
    </div>
    <div class="breadcrumbs">

    </div>
</footer>