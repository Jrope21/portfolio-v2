<script>
import { onMount } from 'svelte'

import HeroImg from './HeroImg.svelte';
import HeroText from './HeroText.svelte';

    
</script>

<style>
 .hero-container{
     width: 100%;
     display: flex;
     
     flex-direction: column-reverse;
     align-items: center;
     position: relative
 }

@media screen and (min-width: 40em) {
    .hero-container {
        flex-direction: row;
        /* margin-top: 50px */
    }
}

 .hero {
     width: auto;
     display: flex;
    align-items: center;
    width: auto;
    justify-content: flex-start;
 }

@media screen and (min-width: 40em) {
    .hero {
        width: 100%;
    }
}

@media screen and (min-width: 1094px){
    .hero {
        /* justify-content: center; */
    }
}

 /* @media screen and (min-width: 40em){
     .hero::before {
         content: '';
         position: absolute;
         top:-10%;
         left: -20%;
         width: 67%;
         height: 120%;
         background: rgba(0, 0, 0, 0.1);
     }
 } */

.text {
    width: 100%;
}

@media screen and (min-width: 40em) {
    .text {
        padding-left: 10rem;
    }
}

@media screen and (min-width: 64em){
    .text {
        padding-left: 40rem;
    }   
}

@media screen and (min-width: 75em){
    .text {
        padding-left: 70rem;
    }
}

</style>

<div class="hero-container">
    <div class="hero">
        <HeroImg />
    </div>
    <div class="text">
        <HeroText />
    </div>
</div>