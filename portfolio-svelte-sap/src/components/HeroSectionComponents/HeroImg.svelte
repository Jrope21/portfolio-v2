<script>
import { onMount } from 'svelte';
import ImageGradient from '../IconComponents/ImageGradient.svelte';
let heroImg;
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
</style>

<div bind:this={heroImg} class="hero-image">
    <ImageGradient />
</div>
