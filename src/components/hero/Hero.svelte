<script>
import { onMount } from 'svelte'

import HeroImg from './HeroImg.svelte';
import HeroText from './HeroText.svelte';

    
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    .hero-container{
        width: 100%;
        display: flex;
        z-index: 1;
        flex-direction: column-reverse;
        align-items: center;
        position: relative;

        @media (min-width: breakpoint(sm)) {
            flex-direction: row;
        }
    }

    .hero {
        width: auto;
        display: flex;
        align-items: center;
        width: auto;
        justify-content: flex-start;

        @media (min-width: breakpoint(sm)) {
            width: 100%;
        }
    }

    .text {
        width: 100%;

        @media (min-width: breakpoint(sm)) {
            padding-left: 10rem;
        }

        @media (min-width: breakpoint(md)) {
            padding-left: 40rem;
        }

        @media (min-width: breakpoint(lg)) {
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