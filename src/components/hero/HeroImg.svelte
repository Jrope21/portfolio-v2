<script>
import { onMount } from 'svelte';
let heroImg;
</script>

<style>

    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("../images/hero-doe.png");
        background-size: cover;
         -o-background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        background-position: 45% 65%;
        box-shadow: 3px 3px 3px lightgrey;
        position: relative;
        z-index: 2;
        transition: top .01s ease-in;
    }

    @media screen and (min-width: 40em){
        .hero-image {
            margin-right: -70px;
            width: 220px;
            background-position: 45% 25%;
            height: 320px;
        }
    }

    @media screen and (min-width: 64em){
        .hero-image {
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
            z-index: -1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 237px;
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

<img width="1px" height="1px" src="images/hero-doe.png" alt="A picture of Joshua Roper leaning against a wall." >
<div class="box">
    <div class="hero-image" ></div>
</div>