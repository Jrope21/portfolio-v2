<script>
import { onMount } from 'svelte';

let arrow;

onMount(()=>{

    window.addEventListener('scroll', ()=>{
        let scrollHeight = window.pageYOffset;
        
        arrow.style.marginBottom = `-${scrollHeight / 40}px`
    })

})
</script>

<style>
@keyframes specialFadeInDoe {
    0%{
        bottom: 125px;
    }
    100%{
       bottom: 110px;
       opacity: 1;
    }
}
@keyframes bounce {
    0%{
        /* opacity: 0; */
        bottom: 110px;
    }
    50%{
        /* opacity: 0; */
        bottom: 115px;
    }
    100%{
       bottom: 110px;
       opacity: 1;
    }
}
    a {
        position: absolute;
        bottom: 110px;
        /* left: 100px; */
        left: 25%;
        transition: margin-bottom .01s ease-in;
        animation: .8s ease-in-out 5s 1 specialFadeInDoe forwards;
        opacity: 0;
        box-shadow: 1px 1px 1px lightgray;
    }
  
    a:before {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        left: 5px;
        transform: rotate(45deg);
        
    }
    a:after {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        right: 5px;
        transform: rotate(-45deg);
    }

    /*span sets up dashes*/
   span {
        position: relative;
        display: block;
        border-right: 1px solid gray;
        height: 20px;
        top: -10px;
        
    }

</style>

<a href="#" bind:this={arrow}><span></span></a>