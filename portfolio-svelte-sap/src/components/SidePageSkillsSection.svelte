<script>
    import Skills from './PortfolioNestedPageComponents/Skills.svelte';
    let skills = [
    {
        name: 'HTML5'
    },
    {
        name: 'CSS3'
    },
    {
        name: 'JavaScript'
    },
    {
        name: 'jQuery'
    },
    {
        name: 'Kentico CMS'
    },
]
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
        font-size: 12rem;
        text-transform: uppercase;
        margin-bottom: 10px;
        text-align: center;
    }
</style>

<div class="skills-section">
    <h3>Skills</h3>
    <div class="skills">
        {#each skills as skill}
            <Skills skill={skill.name} />
        {/each}
    </div>
</div>