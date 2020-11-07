<script> 
export let url, target, text;
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    a {
        color: color(secondary);
        transition: all .45s ease-in-out;
        opacity: .75;
    }

    a:hover {
        color: black;
    }

</style>

<a href="{url}" target={target}>{text}</a>