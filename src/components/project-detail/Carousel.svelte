<script>
import { fade, fly } from 'svelte/transition'

let STATE = {
    images: [
        {
            src: 'images/halcyon-5.jpg',
            visible: true,
            key: 'desktop',
        },
        {
            src: 'images/uptexas-thumb.jpg',
            visible: false,
            key: 'tablet',
        },
        {
            src: 'images/Jorden-Background-Gray.jpg',
            visible: false,
            key: 'mobile',
        },
    ]
}

function switchSlides(key) {
    
    STATE.images.forEach(img => {
        if(key === img.key) {
            img.visible = true;
            
        } else {
            img.visible = false;
        }
    })

    STATE = {...STATE};
}

</script>

<style>
.carousel-container {
    position: relative;
    display: flex;
    align-items: flex-end;
    /* height: 700px; */
}

@media screen and (min-width: 40em){
    .box {
        /* position: absolute;
        top: 0;
        left: 0; */
        display: inline-block;
        background: url("../images/drawing.jpg");
        z-index: -1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 237px;
        border: 3px solid black;
        height: 411px;
        background: transparent;
    }
}

@media screen and (min-width: 64em) {
    .box {
        width: 400px;
        height: 616px;
    }
}

.slide {
    position: absolute;
    width: 88%;
    height: 82%;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;  
}

div.circles-container {
    display: flex;
    margin-left: 30px;
    margin-bottom: 25px;
}

span.circle {
    position: relative;
    display: block;
    width: 15px;
    height: 15px;
    border: 1px solid #3B3B3B;
    border-radius: 50%;
    margin-right: 15px;
    overflow: hidden;
    /* transition: opacity .3s ease; */
}

span.circle::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 110%;
    height: 110%;
    border-radius: 50%;
    background: #3B3B3B;
    opacity: 0;
    transition: opacity .3s ease;
}

span.circle.active::before {
    opacity: 1;
}

</style>

<!-- notes to come back to -->
<!-- TODO -  -->
<div class="carousel-container">
    <div class="box">CREATIVE REVOLT</div> <!-- TODO style text to appear nice on fade out-->
    <!-- TODO - make top of box longer then bottom -->
        {#each STATE.images as img}
            {#if img.visible}
                <div transition:fly="{{ x: -70, duration: 650 }}" class="slide">
                    <img src="{img.src}" alt="wassup">
                </div>
            {/if}
        {/each}
    <div class="circles-container">
        {#each STATE.images as img, i}
            <span 
                on:click={() => {
                    switchSlides(img.key)
                }} 
                class="circle {img.visible ? 'active' : ''}"
            ></span>
        {/each}
    </div>
</div>