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
    section::before {
        content: '';
        background: rgba(34, 34, 34, 0.082);
        /* background: linear-gradient(rgba(34, 34, 34, 0.082), rgba(34, 34, 34, 0.092)); */
        position: absolute;
        width: 100vw;
        height: 100%;
        z-index: -2;
    }
</style>

<section in:fadeIn class="center-all">
    <ContactSection />
</section>