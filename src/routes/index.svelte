<script>
import PageTransition from './PageTransition.svelte';

import Hero from '../components/hero/Hero.svelte';
import Projects from '../components/projects/Projects.svelte'

</script>

<style>

    .container {
        position: relative;
        margin-top: 90px;
    }

</style>

<svelte:head>
	<title>Home | Front End Developer - Joshua Roper</title>
</svelte:head>


<PageTransition>
    <div class="container">
        <Hero />
        <Projects />
    </div>
</PageTransition>