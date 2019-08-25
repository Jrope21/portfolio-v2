<script>
    import { onMount } from 'svelte';
    let logo;
    let shape;

    let position = { scrolled: false };
    
    onMount(() => {
        logo.classList.remove('scrolled')
        let scrolledCheck = () => {
            let scroll = window.pageYOffset;
            if(scroll > 130){
                logo.classList.add('scrolled')
            } else {
                logo.classList.remove('scrolled')
            }

        }
        window.addEventListener("scroll", scrolledCheck);
        
    })

</script>

<style>
    a {
        position: fixed;
        font-size: 8rem;
        left: 25px;
        top: 25px;
        opacity: 0;
        color: gray;
        transition: all .25s ease-in-out;
        border-radius: 100%;
        border: 1px solid gray;
        padding: 8px;
        z-index: 2;
    }
    a.scrolled {
        opacity: 1 !important;
    }

</style>

   <a href="." class="scrolled" bind:this={logo}>
        <p>JR</p>
    </a>

        


