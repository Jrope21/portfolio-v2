<script>
import PageHeaderVariant from '../components/IconComponents/PageHeaderVariant.svelte';
import AboutMe from '../components/AboutSectionComponents/AboutMe.svelte';
import SkillsSection from '../components/AboutSectionComponents/SkillsSection.svelte';
</script>

<style>
 section {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        padding: 8% 0 0% 0;
        position: relative;
        color: gray;
    }
    @media screen and (min-width: 64em) {
        section{
            /* flex-direction: row;
            justify-content: center;
            align-items: unset; */
            flex: 1;
        }
    }

    /* section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(34, 34, 34, 0.022);
        z-index: -1;
    } */
	.container {
        width: 65%;
        margin-bottom: 40rem;
		margin-left: 100rem;
        /* opacity: 0; */
        max-width: 900px;
    }
    @media screen and (min-width: 40em){
        .container {
            width: 75%;
            margin-bottom: 100rem;
        }
    }
</style>

<svelte:head>
	<title>About</title>
</svelte:head>

<PageHeaderVariant title={'Joshua Roper'} />

<section>
	<div class="container">
		<AboutMe />
	</div>
	<div class="container">
		<SkillsSection />
	</div>
</section>