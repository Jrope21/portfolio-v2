<script>
import Hero from '../components/hero/Hero.svelte';
import Projects from '../components/projects/Projects.svelte'

    // import { onMount } from 'svelte';  



    // let x = .0;
    // let sections = [];

    // onMount(()=>{
    //     for(let i = 0; i < sections.length; i++){
    //         let fadeInOrder = () => {
                
    //             sections[i].style.animation = `${'.7'}s ease-in ${x}s 1 fadeIn forwards`;
    //             x += .35;

    //         }
    //         fadeInOrder();
    //     }
    // })
</script>

<style>
    .container {
        position: relative;
        margin-top: 90px;
        /* opacity: 0; */
    }
</style>

<div class="container">
    <Hero />
    <Projects />
</div>
