<script>
export let text;

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

span.hover-animation {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-right: 30px;   
}

span.text-animation::before {
    content: '';
    position: absolute;
    border-bottom: 2px solid;
    width: 20px;
    top: 50%;
    left: 0;
    transform: translate(-30px,-50%);
    display: block;
}

span.hover-animation > span.text-animation {
    transition: transform .3s $custom_animation, .3s color $custom_animation;
}

:global(a:hover) > span.hover-animation > span.text-animation {
    transform: translate(30px);
    color: color(accent);
}

</style>

<span class="hover-animation">
    <span class="text-animation">{text}</span>
</span>