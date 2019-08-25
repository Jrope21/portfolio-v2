<script>
import SingleProjectText from './SingleProjectSectionComponents/SingleProjectText.svelte';
import SingleProjectImage from './SingleProjectSectionComponents/SingleProjectImage.svelte';
</script>

<style>
    @media screen and (min-width: 40em){
        .container {
            display: flex;
        }
        .project-text{
            flex: 30%;
        }
        .project-image{
            padding-top: 20%;
            padding-left: 10%;
            flex: 30%;
        }
    }
</style>

<div class="container"> 
    <div class="project-text">
        <SingleProjectText />
    </div>
    <div class="project-image">
        <SingleProjectImage />
    </div>
</div>