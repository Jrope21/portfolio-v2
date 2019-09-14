<script>
import SideProjectCard from './IconComponents/SideProjectCard.svelte';
import Button from './IconComponents/Button.svelte';

let projects = [
        {
            url: '',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            url: '',
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
        },
        {
            url: '',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'ANBTX'
        },
    ]
</script>

<style>
div.side-bar-contiainer{
    width: 17vw;
    height: 100%;
    min-height: fit-content;
}

h3::after {
    content: '';
    display: block;
    width: 100%;
    height: 7px;
    margin: 5px 0px 18px 0px;
    background: lightgray;
}

@media screen and (min-width: 64em){
    h3 {
        margin-top: 0rem;
    }
}
</style>

<div class="side-bar-container">
    <h3>Projects</h3>
    {#each projects as project}
        <SideProjectCard imgSrc={project.imgSrc} projectName={project.projectName} />
    {/each}
    <Button text={'Explore More Works'} />
</div>