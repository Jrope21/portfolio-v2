<script>
    // import ContactModal from './ContactModel.svelte';
	import { createEventDispatcher } from 'svelte';

    export let name;
    export let url;
    export let rel;
    export let segment;
    export let modal;
    export let showPop;
    const dispatch = createEventDispatcher();


</script>
<style>
    a {
        position: relative;
        color: gray;
        top: 0;
         transform: rotate(0deg);
        transition: all .5s ease-in-out;
        text-transform: uppercase;
        font-size: 12rem;
    }
   li > a {
        height: 100%;
        width: fit-content;
        display: flex;
        align-items: center;
    }
    
    @media screen and (min-width: 560px){
        li > a {
            height: 100px;
        }
    }

    li > a::after {
        content: '';
        position: absolute;
        display: inline-block;
        border-bottom: 1px solid gray;
        width: 1px;
        margin: 8px 0px;
        opacity: 0;
        transition: all .6s ease-in-out;
    }

    li:hover > a::after {
        opacity: 1;
        width: 100%;
    }

</style>
{#if modal}
 <a  on:click {rel} href="{url}" class='{segment === "blog" ? "selected" : ""}'>
        {name}
</a>
<!-- <ContactModal showModal={showModal} /> -->
{:else}
<a {rel} href="{url}" class='{segment === "blog" ? "selected" : ""}'>
        {name}
</a>
{/if}

