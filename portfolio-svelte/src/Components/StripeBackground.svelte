<script>
import { onMount } from 'svelte';
let stripes;
onMount(()=>{
     setTimeout(()=>{stripes.style.left = 0;},200)
})
</script>

<style>
.stripes {
    position: fixed;
    left: 100px;
    display: inline-block;
    /* border-bottom: 1px solid #00E2FF; */
    border-bottom: 1px solid gray;
    width: 200vw;
    transform: rotate(45deg);
    /* height: 20px; */
    margin-top: 10px;
    transition: left 1.5s ease-in-out;
}
.stripes::before {
    content: '';
    position: absolute;
    display: inline-block;
    /* border-bottom: 1px solid #00E2FF; */
    border-bottom: 1px solid gray;
    width: 100%;
    margin-top: 10px;
    /* height: 20px; */

    transition: all .7s ease-in-out;
}

.stripes::after {
    content: '';
    position: absolute;
    display: inline-block;
    /* border-bottom: 1px solid #00E2FF; */
    border-bottom: 1px solid gray;
    width: 100%;
    /* height: 20px; */
  margin-top: 20px;
    transition: all .7s ease-in-out;
}
</style>

<span class="stripes" bind:this={stripes}></span>