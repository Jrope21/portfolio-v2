<script>
    import PageTransition from './PageTransition.svelte';

    import SideBar from '../components/experience/SideBar.svelte';
    import ResumeContent from '../components/experience/ResumeContent.svelte';
</script>

<style lang="scss">
    @import '../styles/global.variables.scss';
    @import '../components/experience/experience-fonts.styles.scss';

    .container {
        position: relative;
        margin-top: 90px;
    }

    .experience {
        display: flex;
        flex-direction: column-reverse;
    }

    @media screen and (min-width: breakpoint(sm)) {
        .experience {
            padding-top: 50px;
            flex-direction: row;
        }
    }

    @media (min-width: breakpoint(md)) {
        .experience {
            padding-top: 80px;
        }
    }

    .left {
        width: 100%;
    }

    @media screen and (min-width: breakpoint(sm)) {
        .left {
            width: 60%;
        }
    }

    .right {
        width: 100%;
        background: white;
    }

</style>

<svelte:head>
	<title>Experience | Front End Developer - Joshua Roper</title>
</svelte:head>


<PageTransition>
    <div class="experience container">
        <div class="left">
            <SideBar />
        </div>
        <div class="right">
            <ResumeContent />
        </div>
    </div>
</PageTransition>