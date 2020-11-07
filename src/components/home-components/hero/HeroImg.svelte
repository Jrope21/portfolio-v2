<script>
import { onMount } from 'svelte';
let heroImg;
</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("../thumbnails/professional-hero-min.jpg");
        background-size: cover;
         -o-background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        background-position: 45% 25%;
        box-shadow: 3px 3px 3px lightgrey;
        position: relative;
        z-index: 2;
        transition: top .01s ease-in;

        @media (min-width: breakpoint(sm)) {
            margin-right: -70px;
            width: 220px;
            background-position: 45% 10%;
            height: 320px;
        }

        @media (min-width: breakpoint(md)) {
            margin-right: -90px;
            width: 320px;
            height: 520px;
        }

        @media (min-width: breakpoint(lg)) {
            width: 420px;
            height: 620px;
        }
    }

    @media (min-width: breakpoint(sm)) {
        .box {
            display: inline-block;
            z-index: -1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 237px;
            border: 3px solid black;
            height: 411px;
            background: transparent;

            @media (min-width: breakpoint(md)) {
                width: 355px;
                height: 616px; 
            }

            @media (min-width: breakpoint(lg)) {
                width: 497px;
                height: 862.4px;
            }
        }
    }

    img {
        display: none;
    }

</style>

<div class="box">
    <div class="hero-image" ></div>
</div>