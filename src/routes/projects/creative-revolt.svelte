<script>
import PageTitle from '../../components/about/PageTitle.svelte';
import ImageGrid from '../../components/project-detail/ImageGrid.svelte'
</script>

<style>

</style>

<svelte:head>
	<title>Creative Revolt | Front End Developer - Joshua Roper</title>
</svelte:head>

<div 
    in:fly="{{ x: -80, duration: 500, delay: 200, }}"
>
    <PageTitle title={'Creative Revolt'} />
</div>

<section class="container">
    <ImageGrid />
</section>