<script>
import Image from './Image.svelte';
import TopBar from './TopBar.svelte';
import Description from './Description.svelte';
import Carousel from './Carousel.svelte';
// import Summary from './Summary.svelte';
</script>

<style>
@media screen and (min-width: 40em){
    .inner-container {
        /* width: 90%; */
        margin: 0 auto;
    }
}
.image-grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
}

@media screen and (min-width: 40em){
    .image-grid {
        box-sizing: border-box;
        flex-direction: row;
        align-items: unset;
        width: 50%;
        /* padding-left: 5%; */
        margin: 0 auto;
    }
    .project-description {
        /* padding-top: 8%; */
        padding-left: 12%;
        width: 60%;
        margin: 60rem 0;
    }
}

@media (min-width: 64em) {
    .project-description {
        width: 50%;
    }
}

.grid-element-container {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8%;
}

@media screen and (min-width: 40em){
    .grid-element-container {
        width: 50%;
    }
    .grid-element-container.full-width {
        width: 100%;
    }
    .grid-60 {
        width: 60%;
    }
    .grid-40 {
        width: 40%;
    }
}
</style>

<div class="inner-container">
    <!-- <TopBar /> -->
    <!-- <div class="grid-x"> -->
    <!-- <Summary /> -->
        
        
        <Carousel />
        <div class="project-description">
            <Description />
        </div>
    <!-- </div> -->
</div>