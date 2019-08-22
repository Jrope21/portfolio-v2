<script>
import MultiProjectCard from './MultiProjectCard.svelte';
let projects = [
    {
        imgSrc: 'images/homePage/university-park-cta.jpeg',
        projectName: 'University Park'
    },
    {
        imgSrc: 'images/homePage/bub.jpeg',
        projectName: 'Creative Revolt'
    },
    {
        imgSrc: 'images/homePage/WBUH.jpeg',
        projectName: 'HomeVestors'
    }
]

</script>

<style>
h2 {
    font-size: 12rem;
    text-transform: uppercase;
    width: fit-content;
    /* margin: auto; */
    margin-bottom: 20rem;
}
div:not(.card-container) {
    width: 100%;
    padding: 100rem 0rem;
}
.card-container{
    flex-direction: column;
}
@media screen and (min-width: 40em){
    .card-container{
        flex-direction: row;
        /* flex-wrap: wrap; */
    }
}
</style>

<div>
    <h2>Recent Works</h2>
    <div class="card-container center-all">
        {#each projects as project}
            <MultiProjectCard imgSrc={project.imgSrc} projectName={project.projectName}/>
        {/each}
    </div>
</div>