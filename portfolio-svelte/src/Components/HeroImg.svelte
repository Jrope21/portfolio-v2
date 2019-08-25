<script>
import { onMount } from 'svelte';
import ImageGradient from './IconComponents/ImageGradient.svelte';
let heroImg;
// onMount(()=>{

//     window.addEventListener('scroll', ()=>{

//         let scrollHeight = window.pageYOffset;
        
//         heroImg.style.top = `-${scrollHeight / 20}px`

//     })

// })

</script>

<style>
    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("images/homePage/newYork.jpg");
        background-size: 230%;
        background-position: 45% 65%;
        overflow-y: hidden;
        position: relative;
        top: 30px;
        transition: top .01s ease-in;
    }
    .hero-image::before {
        content: '';
        display: inline-block;
        width: 100%;
         height: 100%;
         background: rgb(24, 24, 24, .2);
    }
    /* .hero-image::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 40px;
        background: white;
        z-index: 1;
    } */
    
    /* .overlay{
         width: 100%;
         height: 100%;
         background: rgb(24, 24, 24, .2);
    } */

    
</style>

<div bind:this={heroImg} class="hero-image">
        <!-- <div class="overlay boxes">
        
        </div> -->
    <ImageGradient />
</div>
