<script>
import LogoText from './LogoText.svelte';
import Summary from './Summary.svelte';
import JobExperience from './JobExperience.svelte';
import Projects from './Projects.svelte';
import Education from './Education.svelte';
</script>

<style>
@media (min-width: 1366px) {
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
    <Projects />
    <Education />
</div>