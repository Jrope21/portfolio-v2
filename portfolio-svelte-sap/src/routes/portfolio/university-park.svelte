<script>
import PageHeader from '../../components/IconComponents/PageHeader.svelte';
import Skills from '../../components/PortfolioNestedPageComponents/Skills.svelte';
import HeroText from '../../components/PortfolioNestedPageComponents/HeroText.svelte';
import Button from '../../components/IconComponents/Button.svelte';
import TextUnderline from '../../components/IconComponents/TextUnderline.svelte';
import HeroImage from '../../components/PortfolioNestedPageComponents/HeroImage.svelte';
let textHero = `
A beautiful website built for the City of University Park. 
With over 100 pages it includes a dynamic content slider, form verification, multiple third party integrations, and much more.

`

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
    .container {
        width: 65%;
    }
    h3 {
        font-size: 12rem;
        text-transform: uppercase;
        margin-bottom: 5px;
        text-align: center;
    }
    .skills {
        display: flex;
        flex-wrap: wrap;  
    }
    a {
        display: flex;
        align-items: center;
        font-weight: 300;
        /* text-decoration: underline; */
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
    }
</style>


<section>
    <PageHeader sidePage={'side-page'} title={'University Park'} />
    <div class="container">
        <HeroText text={textHero}/>
        <!-- <Button text={'Website'} /> -->
        <a href=""><TextUnderline text={'View Website'} /></a>
        <HeroImage src={'/images/uptexas/desktop.png'} />
        <!-- <img src="" alt=""> -->
        <h3>Skills</h3>
        <div class="skills">
            {#each skills as skill}
                <Skills skill={skill.name} />
            {/each}
        </div>
    </div>
</section>