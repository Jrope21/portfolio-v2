<script>
import SideProjectCard from './IconComponents/SideProjectCard.svelte';
import SideBarSocial from './PortfolioNestedPageComponents/SideBarSocial.svelte';
import SideProjectSkills from './IconComponents/SideProjectSkills.svelte';

import Button from './IconComponents/Button.svelte';

export let projects;


</script>

<style>
/* div.side-bar-contiainer{
    width: 17vw;
    height: 100%;
    min-height: fit-content;
} */
div.side-bar-container {
    /* position: sticky; */
    /* top: 0%; */
    height: 100%;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: space-between;  */
    margin-bottom: 100rem;
}
div.container {
    margin-bottom: 60rem;
}
div.container:first-of-type{
    margin-top: 40rem
}

@media screen and (min-width: 64em){
    div.container {
        margin-bottom: 80rem
    }
    div.container:first-of-type{
    margin-top: 0rem
}
}
h3::after {
    content: '';
    display: block;
    width: 100%;
    height: 7px;
    margin: 5rem 0px 18rem 0px;
    background: lightgray;
}

.sticky{
    position: sticky;
    top: 40px;
    /* margin-bottom: 100rem; */
    transition: all .1s ease-in;
}

@media screen and (min-width: 64em){
    h3 {
        margin-top: 0rem;
    }
}
</style>

<div class="side-bar-container">
    <div class="container">
        <h3>Projects</h3>
        {#each projects as project, i}
            {#if i === 0}
                <SideProjectCard first={true} imgSrc={project.imgSrc} projectName={project.projectName} />
            {:else}
                <SideProjectCard first={false} imgSrc={project.imgSrc} projectName={project.projectName} />
            {/if}
        {/each}
        <Button text={'Explore More Works'} />
    </div>
    <div class="sticky">
        <div class="container">
            <h3>Skills</h3>
            <SideProjectSkills />
        </div>
        <div class="container">
            <h3>Get In Touch</h3>
            <SideBarSocial />
        </div>
    </div>
</div>