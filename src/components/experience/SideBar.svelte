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

@media (min-width: 64em) {
    aside {
        padding-top: 165px;
    }
}

@media (min-width: 1366px) {
    aside {
        padding-top: 140px;
    }
}
</style>

<aside>
    <LogoText addClass="show-for-small" />
    <Skills />
    <Contact />
</aside>