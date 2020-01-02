<script>
import LogoText from './LogoText.svelte';
import Skills from './Skills.svelte';
import Contact from './Contact.svelte';
</script>

<style>
@media screen and (min-width: 40em) {
    aside {
        padding-top: 165px;
    }
}
</style>

<aside>
    <LogoText addClass="show-for-small" />
    <Skills />
    <Contact />
</aside>