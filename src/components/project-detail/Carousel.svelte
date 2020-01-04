<script>
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
    console.log(STATE.images);
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
        width: 355px;
        height: 616px;
    }
}

/* @media screen and (min-width: 1366px){
    .box {
        width: 497px;
        height: 862.4px;
    }
} */

.slide {
    position: absolute;
    width: 95%;
    height: 80%;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;  
}

</style>

<div class="carousel-container">
    <div class="box"></div>
        {#each STATE.images as img}
            {#if img.visible}
                <div class="slide">
                    <img src="{img.src}" alt="wassup">
                </div>
            {/if}
        {/each}
        <!-- <div class="slide">
            <img src="images/Jorden-Background-Gray.jpg" alt="wassup">
        </div> -->
    <div class="circles">
        {#each STATE.images as img, i}
            <span 
                on:click={() => {
                    switchSlides(img.key)
                }} 
                class="circle"
            >
                circle {i}
            </span>
        {/each}
    </div>
</div>