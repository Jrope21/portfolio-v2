<script>
import { onMount } from 'svelte';

let heroImg;
</script>

<style>

    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("../images/drawing.jpg");
        background-size: 130%;
        background-position: 45% 65%;
        /* overflow-y: hidden; */
        position: relative;
        transition: top .01s ease-in;
    }

    @media screen and (min-width: 40em){
        .hero-image {
            margin-right: -70px;
            width: 220px;
            background-position: 45% 25%;
            height: 320px;
            box-shadow: 3px 3px 3px lightgrey;
        }
    }

    @media screen and (min-width: 64em){
        .hero-image {
            /* width: 250px; */
            /* height: 420px; */
            margin-right: -90px;
            width: 320px;
            height: 520px;
        }
    }

    @media screen and (min-width: 1366px){
        .hero-image {
            width: 420px;
            height: 620px;
        }
    }

    @media screen and (min-width: 40em){
        .box {
            display: inline-block;
            background: url("../images/drawing.jpg");
            /* top: -13%; */
            z-index: -1;
            /* left: -40%; */
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 237px;
            /* position: absolute; */
            border: 3px solid black;
            height: 411px;
            background: transparent;
        }
    }

    @media screen and (min-width: 64em) {
        .box {
            width: 355px;
            height: 616px;
        }
    }

    @media screen and (min-width: 1366px){
        .box {
            width: 497px;
            height: 862.4px;
        }
    }

    img {
        display: none;
    }

</style>

<img width="1px" height="1px" src="images/drawing.jpg" alt="">
<div class="box">
    <div class="hero-image"></div>
</div>