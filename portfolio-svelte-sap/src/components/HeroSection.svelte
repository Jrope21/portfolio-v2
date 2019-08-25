<script>
import HeroImg from './HeroSectionComponents/HeroImg.svelte';
import HeroSocial from './HeroSectionComponents/HeroSocial.svelte';
import HeroTopText from './HeroSectionComponents/HeroTopText.svelte';
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
}
.hero-cta {
    position: absolute;
    top: 0;
    display: flex;
    width:250px;
    margin-top: 45px;
}
</style>
<div class="hero-container center-all">
    <div class="hero-cta">
        <HeroSocial />
        <HeroTopText />
    </div>
    <HeroImg />
</div>
