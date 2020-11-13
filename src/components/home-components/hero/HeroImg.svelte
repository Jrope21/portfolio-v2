<script>
import { onMount } from 'svelte';

import HeroImage from '../../../images/professional-hero-min.jpg';
import HeroImageSmall from '../../../images/professional-hero-min-small.jpg';

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    .hero-image{
        width: 250px;
        height: 420px;
        background: white;
        box-shadow: 3px 3px 3px color(boxShadow);
        position: relative;
        z-index: 2;
        transition: top .01s ease-in;

        @media (min-width: breakpoint(sm)) {
            margin-right: -70px;
            width: 220px;
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

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 45% 25%;

        @media (min-width: breakpoint(sm)) {
            object-position: 45% 10%;
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
            // border: none;
            height: 411px;
            // background: transparent;
            background: color(boxBackground);

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

</style>

<div class="box">
    <div class="hero-image" >
        <img src={HeroImage} alt={'Joshua Roper - Front End Developer'}>
    </div>
</div>