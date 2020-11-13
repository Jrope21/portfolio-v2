<script>
import Logo from './navigation/Logo.svelte';
import { onMount } from 'svelte';

import { draw, fade, blur, slide, scale } from 'svelte/transition';
import { quintOut, quartInOut } from 'svelte/easing';

let visible = true;

onMount(() => {
    setTimeout(() => {
        visible = false;
    }, 3750)
})

</script>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        /* background: white; */
        background: white;
    }

    .background {
		/* background: url('../background-images/so-white.png'); */
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>

<!-- <svelte:body class={'overflow'} /> -->
<!-- <svelte:head>
    {#if visible}
        <style>
            body {
                overflow: hidden;
            }
        </style>
    {/if}
</svelte:head> -->

{#if visible}
    <section out:fade="{{duration: 500, delay: 250, easing: quartInOut}}">
        <span class="page-background background"></span>
        <Logo enableFullAnimation={true} />
    </section>
{/if}