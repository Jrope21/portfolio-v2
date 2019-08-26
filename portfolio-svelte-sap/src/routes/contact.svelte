<script>
    import ContactSection from '../components/ContactSection.svelte';
    import { fadeIn, fadeOut } from "../components/pageFade";
</script>

<style>
    section{
        height: 100vh;
        width: 100vw;
        flex-direction: column;
    }
</style>

<section in:fadeIn class="center-all">
    <ContactSection />
</section>