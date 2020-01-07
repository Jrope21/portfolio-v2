<script>
import { fade, fly } from 'svelte/transition'

let STATE = {
    images: [
        {
            src: 'images/creative-revolt/home.png',
            visible: true,
            key: 0,
        },
        {
            src: 'images/creative-revolt/home-ctas.png',
            visible: false,
            key: 1,
        },
        {
            src: 'images/creative-revolt/about.png',
            visible: false,
            key: 2,
        },
        {
            src: 'images/creative-revolt/about-cta.png',
            visible: false,
            key: 3,
        },
        {
            src: 'images/creative-revolt/writing-class.png',
            visible: false,
            key: 4,
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

<style>
.carousel-container {
    position: relative;
    display: flex;
    align-items: flex-end;
    margin: 20rem 0 60rem 0;
    width: 100%;
    min-height: 250px;
}

@media (min-width: 40em) {
    .carousel-container {
        width: auto;
        margin-top: 40rem;
    }
}

@media screen and (min-width: 40em){
    .box {
        position: relative;
        display: inline-block;
        z-index: -1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 300px;
        border: 3px solid black;
        /* border-right: none; */
        height: 380px;
        /* opacity: 0; */
        background: transparent;
    }

    .box::after {
        /* content: ''; */
        position: absolute;
        background: url('../images/so-white.png');
        background-position-x: 1%;
        border-left: 3px solid black;
        height: 9%;
        width: 120px;
        right: -5px;
        bottom: -3px;
    }

    .box::before {
        /* content: ''; */
        position: absolute;
        border-right: 3px solid black;
        height: 9%;
        right: 0;
        top: -3px;
    }
}

@media (min-width: 64em) {
    .box {
        width: 400px;
        height: 516px;
    }
    .box::after {
        width: 150px;
    }
}

@media (min-width: 1366px) {
    .box {
        width: 500px;
        height: 616px;
    }
}

.title {
    display: none;
    font-size: 40px;
    position: absolute;
    color: #58595b;
    transform: rotate(-90deg);
    margin-right: -15px;
    top: 50%;
    left: -20%;
}

@media (min-width: 40em) {
    .title {
        display: inline;
        left: -25%
    }
}

@media (min-width: 64em) {
    .title {
        font-size: 55px;
    }
}

@media (min-width: 1366px) {
    .title {
        font-size: 67px;
    }
}


.slide {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* max-width: 85vw; */
    height: 250px;
    box-shadow: 3px 3px 3px lightgrey;
    margin: 0 auto;
}

@media (min-width: 40em){
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
    /* height: 250px; */
    bottom: -30px;
    margin: 0 auto;
    /* max-width: 85vw; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* flex-direction: column; */
    /* background: rgba(0,0,0,0.3); */
}

@media (min-width: 40em) {
    div.circles-container {
        position: absolute;
        right:0;
        height: auto;
        width: auto;
        justify-content: flex-end;
        /* position: static;
        margin-left: -10px;
        margin-bottom: 10px; */
        transform: none;
        left: 12%;
        bottom: 0;
        /* top: 9%; */
        /* justify-content: flex-start; */
        /* flex-direction: column; */
        
    }
}

@media (min-width: 64em) {

    div.circles-container {
        /* margin-left: -30px;
        margin-bottom: 20px; */
        
    }
}

span.circle {
    position: relative;
    display: block;
    width: 12px;
    height: 12px;
    border: 2px solid #3B3B3B;
    border-radius: 50%;
    margin: 0px 20px 0 0px;
    overflow: hidden;
    cursor: pointer;
}

@media (min-width: 40em) {
    span.circle {
        margin: 0;
        margin-left: 15px;
        /* border: 1px solid #3B3B3B; */
    }
}

@media (min-width: 64em) {
    span.circle {
        width: 15px;
        height: 15px;
    }
}

@media (min-width: 1366px) {
    span.circle {
        width: 18px;
        height: 18px;
        margin-right: 20px;
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
    background: #3B3B3B;
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

@media (min-width: 40em) {
    .arrow-left {
        right: 30px;
    }
}

.arrow-right {
    right: 20px;
}

@media (min-width: 40em) {
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

<!-- notes to come back to -->
<!-- TODO -  -->
<div class="carousel-container">
<!-- <span class="title">CREATIVE REVOLT</span> -->
    <div class="box"></div> <!-- <span class="title">CREATIVE REVOLT</span> TODO style text to appear nice on fade out-->
    <!-- TODO - make top of box longer then bottom -->
        {#each STATE.images as img}
            {#if img.visible}
                <div transition:fly|local="{{ x: -40, duration: 850 }}" class="slide">
                    <button on:click={() => viewPreviousSlide()} class="back">
                        <span class="arrow-left"></span>
                    </button>
                    <img src="{img.src}" alt="wassup">
                    <button on:click={() => viewNextSlide()} class="next">
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
            ></span>
        {/each}
    </div>
</div>