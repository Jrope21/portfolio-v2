<script>
    // import { onMount } from 'svelte';
    // import {fly} from 'svelte/transition';

    // function fade(node, { delay = 0, duration = 800, offset=window.scrollY }) {
    //     const o = +getComputedStyle(node).opacity;
    //     return {
    //         delay,
    //         duration,
    //         offset,
    //         css: t => `opacity: ${t * o}; margin-top: -${offset}px`
    //     };
    // }

    // function fadeOut(node, { delay = 0, duration = 400, offset=window.scrollY, translate = 100 }) {
    //     const o = +getComputedStyle(node).opacity;
    //     return {
    //         delay,
    //         duration,
    //         offset,
    //         css: t => `opacity: ${t * o}; margin-top: -${offset}px`
    //     };
    // }

    // let show = true;

</script>

<style>
    /* main {
        position: relative;
    } */
</style>

<!-- {#if show}
    <main in:fly="{{ x: -10, duration: 400, delay: 400, }}" out:fadeOut> -->
        <slot></slot>
    <!-- </main>
{/if} -->