<script>
    import SidePageSkillsSection from './SidePageSkillsSection.svelte';
    import ResponsiveImageDisplay from './PortfolioNestedPageComponents/ResponsiveImageDisplay.svelte';
    export let mobileSrc, tabletSrc, desktopSrc;
    
</script>

<style>

</style>

<ResponsiveImageDisplay mobileSrc={mobileSrc} tabletSrc={tabletSrc} desktopSrc={desktopSrc} />
