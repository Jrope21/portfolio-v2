<script>
    import Skills from './PortfolioNestedPageComponents/Skills.svelte';
    export let skills

    
</script>

<style>
    .skills-section {
        /* margin-top: 40rem; */
    }
    .skills {
        display: flex;
        flex-wrap: wrap; 
        justify-content: center; 
    }
    h3 {
        font-size: 13rem;
        /* text-transform: uppercase; */
        margin-bottom: 10rem;
        text-align: center;
         /* margin-top: 40rem; */
    }
</style>

<div class="skills-section">
    <h3>The Stack</h3>
    <div class="skills">
        {#each skills as skill}
            <Skills skill={skill.name} />
        {/each}
    </div>
</div>