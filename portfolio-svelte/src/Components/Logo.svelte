<script>
    import { onMount } from 'svelte';
    let logo;
    let shape;

    let position = { scrolled: false };
    // onMount(() => {
    //nav turns sticky above footer - could change state instead
    
    
    onMount(() => {
        logo.classList.remove('scrolled')
        let scrolledCheck = () => {
            let scroll = window.pageYOffset;
            if(scroll > 130){
                logo.classList.add('scrolled')
            } else {
                logo.classList.remove('scrolled')
            }
            // shape.style.transform = `rotate(-.${scroll}deg)`
            // console.log(shape)
        }
        window.addEventListener("scroll", scrolledCheck);
        
    })
// })
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
        /* transform: rotate(60deg); */
        /* animation: .5s ease-in-out 0s 1 fadeOutTop; */
        
    }
    a.scrolled {
        /* transition: all 1s ease-in-out; */
        opacity: 1 !important;
        /* animation: .5s ease-in-out 0s 1 fadeInTop forwards; */
    }
    /*line coming from top*/
    /* a::before {
        content: '';
        display:inline-block;
        position: absolute;
        top: -22px;
        padding: 14px;
        border-radius: 100%;
        left: 17px;
        
        height:20px;
        transform: rotate(-2deg);
        border-right: 3px solid gray;
        z-index: 3;
        transition: all .5s ease-in;
        opacity: 1;
    }

    a.scrolled::before{
        height: 0px;
        opacity: 0;
        transition: all .5s ease-in;
    } */
    .shape {
        display: inline-block;
        padding:20px;
        border-radius: 100%;
        background: gray;
    }
    /*white cover shape*/
    .shape::before {
        content: '';
        position:absolute;
        display: inline-block;
        padding:17px;
        border-radius: 50%;
        background: white;
        top: 0;
        left: 20%;
        z-index: 1;
    }
    /* .shape::after {
        content: '';
        position:absolute;
        display: inline-block;
        padding:20px;
        border-radius: 100%;
        background: gray;
        top: -10px;
        left: 20px;
    } */
    .letters{
        position: absolute;
        z-index: 2;
        left: 15px;
        top: 8px;
        font-size: 12px;
    }
    .letters > span:nth-child(1){

    }
    .letters > span:nth-child(2){
        position: relative;
        left: -6px;
        top: 4px;
    }
</style>
<!-- {#if position.scrolled}
<a bind:this={logo} href="" class="scrolled">
    <span bind:this={shape} class="shape"></span>
        <span class="letters">
            <span>J</span>
            <span>R</span>
        </span> 
    </a>
 
    {:else} -->
   <a href="" class="scrolled" bind:this={logo}>
    <!-- <span bind:this={shape} class="shape"></span> -->
        <!-- <span class="letters">
            <span>J</span>
            <span>R</span>
        </span>  -->
        <p>JR</p>
    </a>
    <!-- {/if} -->

        


