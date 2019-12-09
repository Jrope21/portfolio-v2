<script>
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
    <meta name="description" content="Hi There! I’m Josh, a Dallas-based Front End Developer with a knack for programing and design. My passion comes from being a part of a solution that brings each aspect of the customer journey together across both development and design processes. I focus on creating production ready applications with my knowledge of the user experience, and writing scalable clean code.">
</svelte:head>

<div class="container">
    <Hero />
    <Projects />
</div>
