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
    border-bottom: 3px solid black;
    width: 0px;
    transform: translate(-100%);
    display: block;
}

a:hover > span.hover-animation::before {
    content: '';
    transform: translate(0);
    width: 20px;
    margin-right: 3px;
}

</style>

<span class="hover-animation">{text}</span>