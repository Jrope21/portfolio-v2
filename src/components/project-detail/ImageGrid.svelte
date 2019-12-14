<script>
import Image from '../projects/Image.svelte';
</script>

<style>
.image-grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
}

@media screen and (min-width: 40em){
    .image-grid {
        flex-direction: row;
        align-items: unset;
        width: 90%;
        margin: 0 auto;
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

<div class="image-grid">
<div class="grid-element-container full-width"> <!-- this should be a cool designer image (logo shiz) -->
        <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container grid-60"> <!-- TODO fix image sizing -- should stay in container -->
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} /> <!-- this should be a tablet view  -- maybe wrap in a curved white border (mimic tablet view) -->
    </div>
    <div class="grid-element-container grid-40"> <!-- TODO fix image sizing -- should stay in container -->
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} /> <!-- this should be a mobile view -- maybe wrap in a curved white border (mimic mobile view)-->
    </div>
    <!-- <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div> -->
    <div class="grid-element-container full-width">
        <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} /> <!-- this should be a desktop view -- maybe make this one taller then first one??? (max-height 550px?)-->
    </div>
    <!-- <div class="grid-element-container full-width">
        <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container full-width">
        <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div> -->
</div>