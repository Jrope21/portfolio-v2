<script>
import HeroImg from './HeroImg.svelte';
import HeroLeftText from './HeroLeftText.svelte';
import HeroRightText from './HeroRightText.svelte';
import HeroArrowDown from './HeroArrowDown.svelte';
</script>

<style>
.hero-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
div.hero-text {
    width: 80%;
    height: 10%;
    /* background: rgba(0, 0, 0, 0.068); */
}
</style>
<div class="hero-container center-all">
    <div class="hero-text">
        <HeroLeftText />
    </div>
    <HeroImg />
    <div class="hero-text">
        <HeroRightText />
    </div>
</div>
<HeroArrowDown />