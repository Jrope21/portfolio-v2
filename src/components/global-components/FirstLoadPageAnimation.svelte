<script>
import Logo from './navigation/Logo.svelte';
import { onMount } from 'svelte';

let visible = true;

onMount(() => {
    setTimeout(() => {
        visible = false;
    }, 4000)
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
        background: white;
    }
</style>

{#if visible}
    <section>
        <Logo enableFullAnimation={true} />
    </section>
{/if}