<script>
import { onMount } from 'svelte';
import ImageGradient from '../IconComponents/ImageGradient.svelte';
let heroImg;
</script>

<style>

    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("../images/drawing.jpg");
        /* background-size: 230%; */
        background-size: 130%;
        background-position: 45% 65%;
        overflow-y: hidden;
        position: relative;
        top: 30px;
        transition: top .01s ease-in;
    }

    @media screen and (min-width: 64em){
        .hero-image {
            width: 400px;
            height: 520px;
            background-size: 100%;
        }
    }

    .hero-image::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    img {
        display: none;
    }

</style>
<img width="1px" height="1px" src="images/drawing.jpg" alt="">
<div bind:this={heroImg} class="hero-image">
    <ImageGradient />
</div>
