<script>
import PageHeader from '../../components/IconComponents/PageHeader.svelte';
import Skills from '../../components/PortfolioNestedPageComponents/Skills.svelte';

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
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10% 0 10% 0;
        position: relative;
        color: gray;
    }
    section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(34, 34, 34, 0.082);
        z-index: -1;
    }
    h3 {
        font-size: 12rem;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
    .skills {
        display: flex;
        flex-wrap: wrap;  
    }
    
</style>


<section>
    <PageHeader sidePage={'side-page'} title={'University Park'} />
    <h3>Skills</h3>
    <div class="skills">
        {#each skills as skill}
            <Skills skill={skill.name} />
        {/each}
    </div>
</section>