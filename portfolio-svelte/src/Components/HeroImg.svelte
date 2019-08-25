<script>
import { onMount } from 'svelte';

let heroImg;

onMount(()=>{

    window.addEventListener('scroll', ()=>{

        let scrollHeight = window.pageYOffset;
        
        heroImg.style.top = `-${scrollHeight / 20}px`

    })

})

</script>

<style>
@keyframes slideInFromTop {
  0% {
    top: -100%;
  }
  50% {
    top: 0;
  }
  100% {
      top: 100%
  }
}
@keyframes slideInFromBottom {
  0% {
    top: 100%;
  }
  50% {
    top: 0;
  }
  100% {
      top: -100%
  }
}

@keyframes slideOutBottom {
    0% {
        top: 0;
    }
    100% {
        top: 100%;
    }
}
@keyframes slideOutTop {
    0% {
        top: 0;
    }
      50% {
        top: 0;
    }
    100% {
        top: -100%;
    }
}
    .hero-image{
        width: 250px;
        height: 420px;
        background-image: url("images/homePage/newYork.jpg");
        background-size: 230%;
        background-position: 45% 65%;
        overflow-y: hidden;
        position: relative;
        top: 30px;
        transition: top .01s ease-in;
    }
    /* .hero-image::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 40px;
        background: white;
        z-index: 1;
    } */
    /* .hero-image::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 40px;
        background: white;
        z-index: 1;
    } */
    
    .overlay{
         width: 100%;
         height: 100%;
         background: rgb(24, 24, 24, .2);
    }

    .boxes::before {
        content: '';
        position: relative;
        display: inline-block;
        background: white;
        height: 100%;
        width: 100px;
        top: 100%;
        animation: 3s linear 0s 1 slideOutBottom;
    }

    .boxes::after {
        content: '';
        position: relative;
        display: inline-block;
        background: white;
        height: 100%;
        width: 100px;
        top: -100%;
        
        animation: 3s linear 0s 1 slideOutTop;
       
    }

    .gradient-animate {
        position: absolute;
        top: 00px;
        width: 100%;
        height: 100%;
    }

     .gradient-animate::before {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to top, rgb(53, 53, 53), gray);
        height: 100%;
        width: 100px;
        top: 100%;
        animation: 3.2s ease-in-out 0s 1 slideInFromTop;
    }

    .gradient-animate::after {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to top, rgb(53, 53, 53), gray);
        height: 100%;
        width: 100px;
        top: -100%;
        animation: 3s ease-in-out 0s 1 slideInFromBottom;
        animation-delay: .4s;
    }

</style>

<div bind:this={heroImg} class="hero-image">
    <div class="overlay boxes">
       
    </div>
     <span  class="gradient-animate"></span>
</div>
