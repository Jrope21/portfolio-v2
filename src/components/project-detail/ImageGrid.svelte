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
}
</style>

<div class="image-grid">
    <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container">
        <Image width={'large'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
    <div class="grid-element-container full-width">
        <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />
    </div>
</div>