<script>
import { onMount } from 'svelte';
import FooterSocial from './FooterSocial.svelte';
import FooterBreadcrumb from './FooterBreadcrumb.svelte';
import Logo from './Logo.svelte';
let breadcrumbs = [
    {
        name: 'about',
        url: ''
    },
    {
        name: 'portfolio',
        url: ''
    },
    {
        name: 'contact',
        url: ''
    }
]

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
    //nav turns sticky above footer - could change state instead
    let nav = document.getElementsByTagName('aside');
    
    window.addEventListener("scroll", () => {
        let footerTopScrollPos = footer.offsetTop - footer.offsetHeight;
        let footerHeight = footer.offsetHeight;
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
        position: relative;
        min-height: 25vh;
        flex-wrap: wrap;
        align-items: center;  
        justify-content: center;  
        font-size: 8rem;
        padding: 20rem 0rem;
    }
    .top-row {
        display: flex;
        flex: 100%;
    }
    @media screen and (min-width: 40em){
        .top-row {
            max-width:75%;
        }
    }
    div:not(.top-row){
        flex: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /* @media screen and (min-width: 40em){
        div{
            flex: 30%;
      
        }
    } */
    .copy
    div.cta, div.breadcrumb{
        min-height: 150px;
    }
    h2{
        text-transform: uppercase;
        font-size: 8rem;
        margin-bottom: 10rem;
    }
    p {
        text-transform: uppercase;
        font-size: 6rem;
        font-weight: 300;
        margin-bottom: 2rem;
    }
    p:nth-child(2){
        font-size: 5rem;
        margin-bottom: 0rem;
    }
</style>

<footer bind:this={footer}>
    <div class="top-row">
        <div class="breadcrumb">
            <h2>Info</h2>
            {#each breadcrumbs as breadcrumb}
                <FooterBreadcrumb name={breadcrumb.name} url={breadcrumb.url}/>
            {/each}
        </div>
        <div class="cta">
            <h2>Connect</h2>
            {#each socialCtas as socialCta}
                <FooterSocial content={socialCta.content} url={socialCta.url}/>
            {/each}
        </div>
    </div>
    <!-- <div class="breadcrumbs">
        <h2>Questions</h2>
    </div> -->
    <div class="copyright">
        <p>@ Joshua Roper 2019</p>
        <p>Innovative | Bold | Creative</p>
    </div>
    
</footer>