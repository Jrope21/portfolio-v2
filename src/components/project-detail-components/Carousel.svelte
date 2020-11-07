<script>
import { fade, fly } from 'svelte/transition'
export let images;


let STATE = {
    images: images
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

function viewNextSlide() {
    let currentSlide = findCurrentSlide();
    let nextSlide = currentSlide !== null ? currentSlide + 1 : null;
    
    if(nextSlide !== null) STATE.images[currentSlide].visible = false;

    if(nextSlide < STATE.images.length) {
        STATE.images[nextSlide].visible = true;
    } else {
        STATE.images[0].visible = true;
    }

    STATE = {...STATE};
}

function viewPreviousSlide() {
    let currentSlide = findCurrentSlide();
    let prevSlide = currentSlide !== null ? currentSlide - 1 : null;
    
    if(prevSlide !== null) STATE.images[currentSlide].visible = false;

    if(prevSlide > -1) {
        STATE.images[prevSlide].visible = true;
    } else {
        STATE.images[STATE.images.length - 1].visible = true;
    }

    STATE = {...STATE};
}

function findCurrentSlide() {
    if(!STATE.images.length) return null;

    let currentSlideIndex;

    STATE.images.forEach((img, i) => {
        if(img.visible) currentSlideIndex = i;
    })
    
    return currentSlideIndex;
}

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    .carousel-container {
        position: relative;
        display: flex;
        align-items: flex-end;
        margin: 25rem 0 70rem 0;
        width: 100%;
        min-height: 250px;
    }

    @media (min-width: breakpoint(sm)) {
        .carousel-container {
            width: auto;
            margin-top: 65rem;
            margin-bottom: 80rem;
        }
    }

    @media (min-width: breakpoint(md)) {
        .carousel-container {
            margin-bottom: 120rem;
            margin-top: 75rem;
        }
    }

    @media screen and (min-width: breakpoint(sm)){
        .box {
            position: relative;
            display: inline-block;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 300px;
            border: 3px solid black;
            height: 380px;
            background: transparent;
        }

        .box::after {
            position: absolute;
            background: url('../background-images/so-white.png');
            background-position-x: 1%;
            border-left: 3px solid black;
            height: 9%;
            width: 120px;
            right: -5px;
            bottom: -3px;
        }

        .box::before {
            position: absolute;
            border-right: 3px solid black;
            height: 9%;
            right: 0;
            top: -3px;
        }
    }

    @media (min-width: breakpoint(md)) {
        .box {
            width: 400px;
            height: 516px;
        }
        .box::after {
            width: 150px;
        }
    }

    @media (min-width: breakpoint(lg)) {
        .box {
            width: 500px;
            height: 616px;
        }
    }

    .title {
        display: none;
        font-size: 40px;
        position: absolute;
        color: color(secondary);
        transform: rotate(-90deg);
        margin-right: -15px;
        top: 50%;
        left: -20%;
    }

    @media (min-width: breakpoint(sm)) {
        .title {
            display: inline;
            left: -25%
        }
    }

    @media (min-width: breakpoint(md)) {
        .title {
            font-size: 55px;
        }
    }

    @media (min-width: breakpoint(lg)) {
        .title {
            font-size: 67px;
        }
    }


    .slide {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 250px;
        box-shadow: 3px 3px 3px lightgrey;
        margin: 0 auto;
    }

    @media (min-width: breakpoint(sm)){
        .slide {
            left: auto;
            position: absolute;
            width: 88%;
            height: 82%;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            margin: 0;
        }
    }

    .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;  
    }

    div.circles-container {
        width: 100%;
        bottom: -30px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    @media (min-width: breakpoint(sm)) {
        div.circles-container {
            position: absolute;
            right:0;
            height: auto;
            width: auto;
            justify-content: flex-end;
            transform: none;
            left: 12%;
            bottom: 0;
        }
    }

    span.circle {
        position: relative;
        display: block;
        width: 12px;
        height: 12px;
        border: 2px solid color(primary);
        border-radius: 50%;
        margin: 0px 20px 0 0px;
        overflow: hidden;
        cursor: pointer;
    }

    @media (min-width: breakpoint(sm)) {
        span.circle {
            margin: 0;
            margin-left: 15px;
            /* border: 1px solid #3B3B3B; */
        }
    }

    @media (min-width: breakpoint(md)) {
        span.circle {
            width: 15px;
            height: 15px;
        }
    }

    @media (min-width: breakpoint(lg)) {
        span.circle {
            width: 18px;
            height: 18px;
            margin-right: 20px;

            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    span.circle::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 110%;
        height: 110%;
        border-radius: 50%;
        background: color(primary);
        opacity: 0;
        transition: opacity .3s ease;
    }

    span.circle.active::before {
        opacity: 1;
    }

    button.next, button.back {
        position: absolute;
        width: 30%;
        height: 100%;
        opacity: .3;
        top: 0;
        transition: all .3s ease-out;
    }

    button.next {
        right: 0;
        background: linear-gradient(to left,rgba(0,0,0,.65) 0,rgba(0,0,0,0) 100%) rgba(0,0,0,0);
    }

    button.back {
        left: 0;
        background: linear-gradient(to right,rgba(0,0,0,.65) 0,rgba(0,0,0,0) 100%) rgba(0,0,0,0)
    }

    button.next:hover, button.back:hover {
        opacity: 1;
    }

    .arrow-left, .arrow-right {
        display: block;
        position: absolute;
        height: 20px;
        width: 20px;
        top: calc(50% - 10px);
        -webkit-transition: -webkit-transform .2s ease-out;
        -webkit-transition-delay: .2s;
        transition: transform .2s ease-out .2s;
    }

    .arrow-left {
        left: 20px;
    }

    @media (min-width: breakpoint(sm)) {
        .arrow-left {
            right: 30px;
        }
    }

    .arrow-right {
        right: 20px;
    }

    @media (min-width: breakpoint(sm)) {
        .arrow-right {
            right: 30px;
        }
    }
    .arrow-left::before, .arrow-right::before, .arrow-left::after, .arrow-right::after {
        content: " ";
        position: absolute;
        right: 0;
        height: 100%;
        width: 2px;
        background-color: white;
        opacity: .7;
        -webkit-transform-origin: 50% 100% 0;
        transform-origin: 50% 100% 0;
        -webkit-transition: -webkit-transform .15s ease-out;
        transition: transform .15s ease-out;
    }

    .arrow-left::before, .arrow-left::after {
        right: auto;
        left: 0;
    }


    .arrow-left::before {
        top: -50%;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .back:hover .arrow-left::before {
        transform: rotate(30deg)
    }

    .arrow-left::after {
        top: calc(-50% + -1px);
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
    }

    .back:hover .arrow-left::after {
        transform: rotate(150deg)
    }


    .arrow-right::before {
        top: -50%;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .next:hover .arrow-right::before {
        transform: rotate(-30deg);
    }

    .arrow-right::after {
        top: calc(-50% + -1px);
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }

    .next:hover .arrow-right::after {
        transform: rotate(-150deg);
    }

</style>

<div class="carousel-container">
    <div class="box"></div> 
        {#each STATE.images as img}
            {#if img.visible}
                <div transition:fly|local="{{ x: -40, duration: 850 }}" class="slide">
                    <button aria-label="a button that shows the previous image in the carousel" on:click={() => viewPreviousSlide()} class="back">
                        <span class="arrow-left"></span>
                    </button>
                    <img src="{img.src}" alt="{img.alt}">
                    <button aria-label="a button that shows the next image in the carousel" on:click={() => viewNextSlide()} class="next">
                        <span class="arrow-right"></span>
                    </button>
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
                aria-label="a button to go to a specific image in the carousel"
            ></span>
        {/each}
    </div>
</div>