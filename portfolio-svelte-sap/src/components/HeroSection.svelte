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
@media screen and (min-width: 64em){
    .hero-container {
        flex-direction: row-reverse;
        justify-content: flex-end;
        width: 75%
    }
}
div.hero-text {
    width: 80%;
    height: 10%;
}
.hero-cta {
    /* position: absolute; */
    position: relative;
    
    top: 0;
    display: flex;
    width:250px;
    /* margin-top: 45px; */
    margin-top: -15%;
}
@media screen and (min-width: 64em){
    .hero-cta {
        flex-direction: column-reverse;
        width: fit-content;
        margin-left: 100px;
    }

}
</style>

<div class="hero-container center-all">
    <div class="hero-cta">
        <HeroSocial />
        <HeroTopText />
    </div>
    <HeroImg />
</div>
