<script>
    import LogoText from './LogoText.svelte';
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';
    
    aside {
        height: 78%;

        @media (min-width: breakpoint(sm)) {
            padding-top: 165px;
        }

        @media (min-width: breakpoint(md)) {
            padding-top: 165px;
            height: 80%;
        }

        @media (min-width: breakpoint(lg)) {
            padding-top: 140px;
        }
    }

</style>

<aside>
    <LogoText addClass="show-for-small" />
</aside>