<script>
import PageTransition from '../PageTransition.svelte';

import PageTitle from '../../components/project-detail/PageTitle.svelte';
import ImageGrid from '../../components/project-detail/ImageGrid.svelte';
import Description from '../../components/project-detail/Description.svelte'
</script>

<style>

</style>

<svelte:head>
	<title>Creative Revolt | Front End Developer - Joshua Roper</title>
</svelte:head>

<PageTransition>
<div>
    <PageTitle title={'Creative Revolt'} />
</div>


    <section class="container">
        <ImageGrid />
    </section>
</PageTransition>