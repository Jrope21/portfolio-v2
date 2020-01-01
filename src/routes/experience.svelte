<script>
import SideBar from '../components/experience/SideBar.svelte';
import ResumeContent from '../components/experience/ResumeContent.svelte';
</script>

<style type="text/scss">
    @import '../components/experience/GlobalExperienceFonts.styles.scss';

    .container {
        position: relative;
        margin-top: 90px;
    }

    .experience {
        display: flex;
        flex-direction: column;
    }

    .left {
        width: 100%;
    }

    .right {
        width: 100%;
        background: white;
    }

</style>

<svelte:head>
	<title>Experience | Front End Developer - Joshua Roper</title>
</svelte:head>

<div class="experience container">
    <div class="left">
        <SideBar />
    </div>
    <div class="right">
        <ResumeContent />
    </div>
</div>