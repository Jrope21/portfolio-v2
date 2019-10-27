<script>
import HeroImg from './HeroImg.svelte';
import HeroText from './HeroText.svelte';
</script>

<style>
 .hero-container{
     width: 100%;
     display: flex;
     flex-direction: column-reverse;
     align-items: center;
 }

 .hero {
     width: 100%;
     display: flex;
     justify-content: center;
 }

.text {
    width: 100%;
}

</style>

<div class="hero-container">
    <div class="hero">
        <HeroImg />
    </div>
    <div class="text">
        <HeroText />
    </div>
</div>