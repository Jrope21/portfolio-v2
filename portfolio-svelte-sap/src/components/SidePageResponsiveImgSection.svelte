<script>
    import SidePageSkillsSection from './SidePageSkillsSection.svelte';
    import ResponsiveImageDisplay from './PortfolioNestedPageComponents/ResponsiveImageDisplay.svelte';

    let responsiveImg = {
        mobileSrc: '/images/uptexas/www.uptexas.org_(iPhone X).png',
        tabletSrc: '/images/uptexas/www.uptexas.org_(iPad).png',
        desktopSrc: '/images/uptexas/www.uptexas.org_(iPad Pro).png'
    }
</script>

<style>

</style>

<ResponsiveImageDisplay mobileSrc={responsiveImg.mobileSrc} tabletSrc={responsiveImg.tabletSrc} desktopSrc={responsiveImg.desktopSrc} />
<SidePageSkillsSection />  