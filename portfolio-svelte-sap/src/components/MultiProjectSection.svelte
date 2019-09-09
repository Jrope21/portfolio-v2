<script>
import MultiProjectCard from './MultiProjectSectionComponents/MultiProjectCard.svelte';
import CircleIcon from './IconComponents/CircleIcon.svelte';
import TextUnderline from './IconComponents/TextUnderline.svelte';


let projects = [
    {
        imgSrc: 'images/university-park-cta.jpeg',
        projectName: 'University Park'
    },
    {
        imgSrc: 'images/bub.jpeg',
        projectName: 'Creative Revolt'
    },
    {
        imgSrc: 'images/WBUH.jpeg',
        projectName: 'HomeVestors'
    }
]

</script>

<style>
h2 {
    font-size: 13px;
    text-transform: uppercase;
    width: fit-content;
    /* margin: auto; */
    margin-bottom: 20rem;
    font-weight: 600
}
a{
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #989898;
    width: fit-content;
    margin-top: 30rem;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
}
h2::after{
    content: '';
    display:block;
    width: 20%;
    margin: 10rem 0rem 20rem 0rem;
    border-bottom: 1px solid lightgray;
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
        justify-content: space-between; 
    }
}
</style>

<div>
   <h2>Recent Works </h2>
   
    <div class="card-container center-all">

        {#each projects as project}
            <MultiProjectCard imgSrc={project.imgSrc} projectName={project.projectName}/>
        {/each}
    </div>
    <a href="portfolio"><CircleIcon /> <TextUnderline text={'explore more works'}/></a>
</div>