<script>
export let text;

</script>

<style>

span.hover-animation {
    display: flex;
    align-items: center;
    overflow: hidden;
}

span.hover-animation::before {
    content: '';
    border-bottom: 3px solid;
    width: 0px;
    transform: translate(-100%);
    display: block;
    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

a:hover > span.hover-animation::before {
    content: '';
    transform: translate(0);
    width: 20px;
    margin-right: 5px;
}

</style>

<span class="hover-animation">{text}</span>