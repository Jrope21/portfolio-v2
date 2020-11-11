<script>
    import LogoText from './LogoText.svelte';
    import Summary from './Summary.svelte';
    import JobExperience from './JobExperience.svelte';
    import ResumeProjects from './ResumeProjects';
    import Education from './Education.svelte';
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    @media (min-width: breakpoint(lg)) {
        .resume-content {
            padding-right: 200px;
            margin-left: -100px;
        }
    }
    
</style>

<div class="resume-content">
    <LogoText addClass="hide-for-small" />
    <Summary />
    <JobExperience />
    <ResumeProjects />
    <Education />
</div>