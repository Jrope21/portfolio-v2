<script>
import HeroImg from './HeroImg.svelte';
import HeroLeftText from './HeroLeftText.svelte';
import HeroRightText from './HeroRightText.svelte';
import HeroArrowDown from './HeroArrowDown.svelte';
import HeroSocial from './HeroSocial.svelte';
import HeroTopText from './HeroTopText.svelte';
</script>

<style>
.hero-container{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
}
div.hero-text {
    width: 80%;
    height: 10%;
    /* background: rgba(0, 0, 0, 0.068); */
}
.hero-cta {
    position: absolute;
    top: 0;
    /* left: 30px; */
    display: flex;
    width:250px;
    margin-top: 45px;
 /* margin: 45px 28px; */
}
</style>
<div class="hero-container center-all">
    <div class="hero-cta">
        <HeroSocial />
        <HeroTopText />
    </div>
    <!-- <div class="hero-text">
        <HeroLeftText />
    </div> -->
    <HeroImg />
    <!-- <div class="hero-text">
        <HeroRightText />
    </div> -->
</div>
<!-- <HeroArrowDown /> -->
