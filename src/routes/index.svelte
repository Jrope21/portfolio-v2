<script>
    import Hero from '../components/home-components/hero/Hero.svelte';
    import Projects from '../components/home-components/projects/Projects.svelte';

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


<div class="container">
    <Hero />
    <Projects />
</div>