<script>
import Description from './Description.svelte';
import Carousel from './Carousel.svelte';
import Skills from './Skills.svelte';
</script>

<style>
@media screen and (min-width: 40em){
    .inner-container {
        width: 90%;
        margin: 0 auto;
    }
}

@media screen and (min-width: 40em){
    .project-description {
        padding-left: 12%;
        margin: 40rem 0;
    }
}
.cta {
    margin: 50rem 0;
}

@media (min-width: 40em) {
    .cta {
        margin: 65rem 0;
        margin-left: 15%;
    }
}

@media (min-width: 64em) {
    .cta {
        margin-left: 17%;
    }
}

.cta p {
    color: #58595b;
    font-size: 18px;
    font-weight: 600;
    font-style: italic;
}

@media (min-width: 64em) {
    .cta p {
        font-size: 26px;
        font-weight: 800;
    }
    
}

.skills-container {
    margin: 40rem 0;
}

@media (min-width: 40em) {
    section {
        padding-left: 12%;
    }
}
</style>

<div class="inner-container">
        <Carousel />
        <section class="project-description">
            <Description />    
        </section>
        <section class="skills-container">
            <Skills />
        </section>
        <section class="cta">
            <p>Check The Site!</p>
        </section>
</div>