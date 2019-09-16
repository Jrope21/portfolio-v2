<script>
export let imgSrc;
export let projectName;
export let first = false;

import TextUnderline from './TextUnderline.svelte';
</script>

<style>
    a, div{
        max-width: 100%;
    }
    .img-container{
        overflow: hidden;
        width: 65vw;
        height: 65vw;
    }
    @media screen and (min-width: 40em){
        .img-container{
            max-width:100%; 
            width: 17vw;
            height: 17vw;
        }   
    }
    @media screen and (min-width: 64em){
        .img-container{
            max-width:100%; 
            width: 23vw;
            height: 23vw;
        }   
    }
    @media screen and (min-width: 84em){
        .img-container{
            max-width:100%; 
            width: 17vw;
            height: 17vw;
        }   
    }
    a:first-of-type img {
        opacity: 1;
    }
    
    a:first-of-type span {
        position: relative;
        /* border-bottom: 1px solid lightGray; */
    
        overflow: hidden;
        padding-bottom:1px;
    }
    a:first-of-type span::before {
        content: '';
        position: absolute;
        bottom: 0px;
        /* left: -100%; */
        display: inline-block;
        border-bottom: 1px solid gray;
        width: 100%;
        /* transform: translate(0); */
        z-index: 1;
        transition: transform .3s ease-in-out;
    }

    img {
        object-fit: cover;
        transition: all .5s ease-in-out;
        width: 100%;
        height: 100%;
        opacity: .5;
    }
    a:hover img {
        /* width: 105%; */
        /* height: 105%; */
        opacity: 1;
    }
    p {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0;
    
        text-transform: uppercase;
        transition: all .2s ease-in-out;

        /* font-size: 12px;
        font-weight: 600; */
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 12rem;
        color: #58595b;
    }
    @media screen and (min-width: 40em){
        p {
            /* margin-bottom: 0rem; */
        }
    }
    /* p::before{
        content: '';
        display: inline-block;
        width: 0px;
        border-bottom: 2px solid gray;
        transition: all .2s ease-in-out;
         
    } */
    /* a:hover p::before {
        content: '';
        margin-right: 20rem;
        width: 30px;
    } */
</style>
{#if first === true}
<a>
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <p><span>{projectName}</span></p>
</a>
{:else}
<a>
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <p><TextUnderline text={projectName} /></p>
</a>
 {/if}
<!-- <span class="animateSick"></span> -->